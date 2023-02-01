import { Badge, Image, Grid, Group, Indicator, Rating, Stack, Text, Title, ThemeIcon, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconDatabase, IconStar, IconTableImport } from "@tabler/icons";
import { Skill, Technology } from "../../utils/queryCms";

const parseLevel = (level: "Beginner" | "Intermediate" | "Advanced" | "Expert" | undefined) => {
  switch (level) {
    case "Beginner":
      return 1;
    case "Intermediate":
      return 2;
    case "Advanced":
      return 3;
    case "Expert":
      return 4;
    default:
      return 0;
  }
}

const useStyles = createStyles((theme) => ({
  icon: {

    color: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
    stroke: theme.white,
    fill: theme.white,
    ['&:svg g']: {
      stroke: theme.white,
      fill: theme.white,
    }
  },
}));

function TechRow(item: Technology) {
  const matches = useMediaQuery("(max-width: 768px)");


  return (
    <Grid my={matches ? 0 : 3} align="center">
      <Grid.Col span={3}>
        <Group position="center">
          {item.attributes?.highlight ? <IconStar size={16} offset={-10} color="yellow" /> : null}
          <Title ta="center" order={5}>{item.attributes?.name}</Title>
        </Group>
      </Grid.Col>
      <Grid.Col span={9}>
        <Stack spacing="xs">
          <Rating readOnly value={parseLevel(item.attributes?.level) + 1} color="cyan" />
          <Group display={matches ? 'none' : undefined}>
            {(item.attributes?.keywords?.split(",") ?? []).map((keyword) => {
              return <Badge color="gray" radius="sm" variant="filled">{keyword}</Badge>
            })}
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default function SkillCard({ icon, title, description, technologies }: Skill) {
  const { classes } = useStyles();
  return (
    <Stack>
      <Text>{description}</Text>
      {
        technologies?.data?.map((tech) => {
          return <TechRow {...tech} key={tech.id} />
        })
      }
    </Stack>
  );
}