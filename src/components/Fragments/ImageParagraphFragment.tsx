import { Title, Text, createStyles, Grid, Space } from "@mantine/core";
import { GroupedTransition } from "@mantine/core/lib/Transition";
import { IconGridDots } from "@tabler/icons";
import ReactMarkdown from "react-markdown";
import { ContentComponentsImage, ContentFragmentsImageParagraph } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";
import ImageFragment from "./ImageFragment";

const useStyles = createStyles((theme) => ({
  highlightText: {
    color: theme.colors.dark[8],
    fontSize: '1.3rem'
  },
  text: {
    fontSize: '1.1rem'
  }
}));

export default function ImageParagraphFragment(fragment: ContentFragmentsImageParagraph) {
  const { classes } = useStyles();

  const imageFragment:ContentComponentsImage = {
    caption: fragment.caption,
    image: fragment.image!,
    renderSize: fragment.renderSize,
    id: fragment.id
  }

  if (fragment.highlight) {
    return (
      <K7Page background="light" key={fragment.id}>
        <Title order={1} ta="center" color="dark" >{fragment.title}</Title>
        <Space h="lg" />
        <Grid>
          <Grid.Col span={3}>
            <ImageFragment key={fragment.id} {...imageFragment} />
          </Grid.Col>
          <Grid.Col span={9}>
            <ReactMarkdown className={classes.highlightText}>
              {fragment.content!}
            </ReactMarkdown>
          </Grid.Col>
        </Grid>
      </K7Page>
    )
  }

  return <K7Page py={20} key={fragment.id}>
    <Grid>
      <Grid.Col span={3}>
        <ImageFragment key={fragment.id} {...imageFragment} />
      </Grid.Col>
      <Grid.Col span={9}>
        <Title order={3}>{fragment.title}</Title>
        <ReactMarkdown className={classes.text}>{fragment.content!}</ReactMarkdown>
      </Grid.Col>
    </Grid>
  </K7Page>
}