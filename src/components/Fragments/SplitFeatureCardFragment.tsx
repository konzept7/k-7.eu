import { Stack, Paper, SimpleGrid, Image, Text, Center, Grid, Group } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ContentFragmentsSplitCard } from "../../utils/queryCms";
import fcStyles from "../../utils/fcstyles";
import ReactMarkdown from "react-markdown";

export default function SplitFeatureCardFragment(fragment: ContentFragmentsSplitCard) {
  const { classes, cx } = fcStyles();
  const containerRef = useRef();
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 0.4,
  });

  return (
    <Center>
      <Grid grow style={{ maxWidth: 1060 }} align="stretch" justify="space-around">
        {
          fragment.items!.map((item) => {
            return (
              <Grid.Col md={6} key={item.id}>
                <Paper className={classes.wrapper} style={{ height: "100%" }}>
                  <Stack justify="space-between">
                    <ReactMarkdown className={classes.text}>
                      {item.text!}
                    </ReactMarkdown>
                    {item.link && <Link to={item.link} className={classes.text}>&gt; {item.linkLabel}</Link>}
                    {item.image && <Image radius="md" src={item.image?.data?.attributes?.url} w="100%" className={cx(classes.image, { [classes.imageUp]: entry?.isIntersecting })} style={{ maxHeight: 500, marginLeft: 'auto', marginRight: 'auto' }} alt={item.image?.data?.attributes?.alternativeText} />}
                  </Stack>
                </Paper>
              </Grid.Col>
            )
          })
        }
      </Grid>
    </Center>
  )
}