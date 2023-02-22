import { Title, createStyles, Grid, Space, Flex, Group } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { redirect } from "react-router-dom";
import { ContentComponentsImage, ContentFragmentsImageParagraph } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";
import ImageFragment from "./ImageFragment";

const useStyles = createStyles((theme) => ({
  highlightText: {
    color: theme.colors.dark[8],
    fontSize: '1.3rem'
  },
  text: {
    fontSize: '1.1rem',
    paddingTop: 0,
  },
  containerWrap: {
    flexWrap: "nowrap",
    [`@media (max-width: ${theme.breakpoints.md}px)`]: {
      flexWrap: "wrap",
    }
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

        <Group>
          <ImageFragment key={fragment.id} {...imageFragment} />
          <ReactMarkdown className={classes.highlightText}>
            {fragment.content!}
          </ReactMarkdown>
        </Group>
      </K7Page>
    )
  }

  return <K7Page py={20} key={fragment.id}>
    <Title order={3}>{fragment.title}</Title>
    <Space h="lg" />
    <Group className={classes.containerWrap} align="flex-start">
      <ImageFragment key={fragment.id} {...imageFragment} />
      <ReactMarkdown className={classes.text}>{fragment.content!}</ReactMarkdown>
    </Group>
  </K7Page>
}