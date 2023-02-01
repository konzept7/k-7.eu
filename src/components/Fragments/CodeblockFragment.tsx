import { Card, Text } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { ContentFragmentsCodeblock } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";

export default function CodeblockFragment(fragment: ContentFragmentsCodeblock) {
  return (
    <K7Page py={10} background="dark">
      <Card>
        <Card.Section>
          <Prism radius="md" withLineNumbers language={fragment.lang!}>{fragment.code!}</Prism>
        </Card.Section>
      </Card>
      <Text color="dimmed" ta="center">{fragment.caption}</Text>
    </K7Page>
  )
}