import { Stack, Paper, SimpleGrid, Image, Text } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useRef } from "react";
import { Link } from "react-router-dom";
import fcStyles from "../../utils/fcstyles";
import K7Page from "../Layout/K7Page";
import ReactMarkdown from "react-markdown";
import { ContentFragmentsFeatureCard } from "../../utils/queryCms";

export default function SingleFeatureCardFragment(fragment: ContentFragmentsFeatureCard) {
  const { classes, cx } = fcStyles();
  const containerRef = useRef();
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.4,
  });

  return (
    <K7Page>
      <Stack p={5} w="100%">
        <Paper className={classes.wrapper} m="auto" ref={ref}>
          <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]} >
            <Stack justify="space-between">
              <ReactMarkdown className={classes.text}>
                {fragment.text!}
              </ReactMarkdown>
              {fragment.link && <Link to={fragment.link} className={classes.text}>&gt; {fragment.linkLabel}</Link>}
            </Stack>
            {fragment.image && <Image radius="md" src={fragment.image?.data?.attributes?.url} w="100%" className={cx(classes.image, { [classes.imageUp]: entry?.isIntersecting })} style={{ maxHeight: 500, marginLeft: 'auto', marginRight: 'auto' }} alt={fragment.image?.data?.attributes?.alternativeText} />}
          </SimpleGrid>
        </Paper>
      </Stack>
    </K7Page>
  )
}