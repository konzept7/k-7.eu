import { Container, createStyles } from "@mantine/core";
import { Autocomplete } from "@mantine/core/lib/Autocomplete";
import ReactMarkdown from "react-markdown";
import { ContentFragmentsSeparator } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";

const ICON_CONTAINER_SIZE = 48;
const ICON_CONTAINER_SMALL = 36;
const useStyles = createStyles((theme) => ({
  iconContainer: {
    margin: 'auto',
    top: '-'+(ICON_CONTAINER_SIZE/2)+'px',
    position: "relative",
    transform: "scale(1)",
    height: ICON_CONTAINER_SIZE,
    width: ICON_CONTAINER_SIZE,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: ICON_CONTAINER_SMALL,
      width: ICON_CONTAINER_SMALL,
    },
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
    filter: "blur(18px)",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: 30,
      height: 30,
      filter: "blur(10px)",
    },
  },
  separator: {
    width: "100%",
    height: '.5em',
    overflow: 'hidden',
    background: "linear-gradient(90deg, rgba(40,44,52,0) 0%, rgba(40,44,52,100) 50%, rgba(40,44,52,0) 100%)"
  }
}));

export default function SeparatorFragment(fragment: ContentFragmentsSeparator) {
  const { classes, cx, theme } = useStyles();

  return <>
      <Container maw={1250} w="100%" px={20}>
        <div className={classes.separator}>
        </div>
        {fragment.icon ?
          <div className={cx(classes.iconContainer)}>
            <i className={cx('ti ti-' + fragment.icon, classes.icon)} />
            <span className={classes.glowingBg} style={{ backgroundColor: theme.colors[fragment.color ?? "grape"][6] }}></span>
          </div>
          :null}
      </Container>
    </>
}