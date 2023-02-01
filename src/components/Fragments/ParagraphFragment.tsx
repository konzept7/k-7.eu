import { Title, Text, createStyles } from "@mantine/core";
import ReactMarkdown from "react-markdown";
import { ContentFragmentsParagraph } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";

const useStyles = createStyles((theme) => ({
  highlightText: {
    color: theme.colors.dark[8],
    fontSize: '1.3rem'
  }
}));

export default function ParagraphFragment(fragment: ContentFragmentsParagraph) {
  const { classes } = useStyles();

  if (fragment.highlight) {
    return (
      <K7Page background="light">
        <Title order={1} ta="center" color="dark" >{fragment.title}</Title>
        <ReactMarkdown className={classes.highlightText}>
          {fragment.content!}
        </ReactMarkdown>
      </K7Page>
    )
  }

  return <span key={fragment.id}>
    <Title order={4}>{fragment.title}</Title>
    <ReactMarkdown>{fragment.content!}</ReactMarkdown>
  </span>
}