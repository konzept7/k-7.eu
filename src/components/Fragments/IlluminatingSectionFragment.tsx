import { Container, createStyles, Group, Title, Text, Stack } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useRef } from "react";
import { ContentFragmentsIlluminatingSection } from "../../utils/queryCms";

const ICON_CONTAINER_SIZE = 48;
const ICON_CONTAINER_SMALL = 36;
const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 800,
  },
  iconContainer: {
    position: "relative",
    transform: "scale(1)",
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,

    transitionDelay: "0ms",
    opacity: 0,
    transition: "opacity 1s cubic-bezier(0.6, 1, 0.3, 1),transform .7s cubic-bezier(0.6, 1, 0.3, 1)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: ICON_CONTAINER_SMALL,
      width: ICON_CONTAINER_SMALL,
    },
  },
  intersecting: {
    opacity: 1,
  },
  icon: {
    color: theme.white,
    display: "inline-block",
    overflow: "visible",
    verticalAlign: "text-bottom",
    strokeWidth: 1 + " !important",
    fontSize: 36,
    padding: 3,
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: ICON_CONTAINER_SMALL,
      width: ICON_CONTAINER_SMALL,
      fontSize: 32,
    },
  },
  glowingBg: {
    boxSizing: "border-box",
    position: "absolute",
    top: 5,
    left: 5,
    zIndex: -1,
    transform: "translateZ(0)",
    width: 38,
    height: 38,
    transition: "opacity 2s cubic-bezier(0.6, 1, 0.3, 1),transform .7s cubic-bezier(0.6, 1, 0.3, 1)",
    transitionDelay: "200ms",
    filter: "blur(18px)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: 30,
      height: 30,
      filter: "blur(10px)",
    },
  },
  title: {
    fontWeight: 500,
    lineHeight: 1.2,
    fontFamily: 'Krub, sans-serif',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.3rem',
    },
  },
  topic: {
    fontFamily: 'Krub, sans-serif',
    color: theme.white,
    fontSize: "2rem",
    letterSpacing: 2.2,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.4rem',
    },
  },
  slideLeft: {
    opacity: 1,
    transform: "translateX(15px)",
  },
  textBlock: {
    opacity: 0,
    transition: "opacity .16s cubic-bezier(0.16, 1, 0.3, 1),transform .6s cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: "600ms",
  },
  description: {
    lineHeight: 1.2,
    fontWeight: 400,
  }
}
)
);

export default function IlluminatingSectionFragment(fragment: ContentFragmentsIlluminatingSection) {
  const container = useRef();
  const { ref: containerRef, entry: containerEntry } = useIntersection({
    root: container.current,
    threshold: 0.2,
    rootMargin: "0px",
  });
  const { classes, cx, theme } = useStyles();

  return (
    <Container fluid ref={containerRef} className={cx(classes.container,)} my={30} p={0}>
      <Group noWrap align="flex-start" spacing={0}>
        <div className={cx(classes.iconContainer, { [classes.intersecting]: containerEntry?.isIntersecting })}>
          <i className={cx('ti ti-' + fragment.icon, classes.icon)} />
          <span className={classes.glowingBg} style={{ backgroundColor: theme.colors[fragment.color ?? "grape"][6] }}></span>
        </div>
        <Stack spacing={5} className={cx(classes.textBlock, { [classes.slideLeft]: containerEntry?.isIntersecting })}>
          <Text className={classes.topic}>{fragment.topic}</Text>
          <div>
            <Title order={2} className={classes.title}>
              <Text lh={1.2} component="span" gradient={{ from: fragment.color ?? 'grape', to: fragment.gradientColor ?? 'orange' }} variant="gradient">{fragment.title}</Text>
              <span className={classes.description}>{' ' + fragment.description}</span></Title>
          </div>
        </Stack>

      </Group>
    </Container>
  )
}