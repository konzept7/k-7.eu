import { Text, Group, Badge, createStyles, Card, Avatar, Image, Stack } from "@mantine/core"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ListArticleResponseItem, CollectionQueryType, colorForStatus } from "../../utils/queryCms"

interface CollectionEntryProps {
  data: {
    id: number
    attributes: ListArticleResponseItem
  },
  type: CollectionQueryType
}


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}));

export default function ArticleCard({ data, type }: CollectionEntryProps) {
  const item = data.attributes
  const { t, i18n } = useTranslation();
  const { classes } = useStyles();
  const tags = item.tags?.split(',').map((tag) => tag.trim())
  const navigate = useNavigate()

  const cover = item.cover?.data.attributes.formats?.small.url ?? item.cover?.data.attributes?.url

  return (
    <Card withBorder radius="md" p={0} className={classes.card} onClick={() => {
      navigate(type === "projects" ? `/projects/${data.id}` : `/news/${data.id}`)
    }}>
      <Group noWrap spacing={0}>
        <Image src={import.meta.env.VITE_CMS + cover} height={140} width={140} />
        <div className={classes.body}>
          <Group position="apart">
            <Stack spacing={0} justify="flex-start">
              {
                item.departments?.data.map((department) => <Text transform="uppercase" color="dimmed" lh={1.1} weight={700} size="xs" key={department.id}>{department.attributes.name}</Text>)
              }
            </Stack>
            {item.status && <Badge variant="dot" color={colorForStatus(item.status!)}>{item.status!}</Badge>}
          </Group>
          <Text className={classes.title} mt="xs" mb="md">
            {item.title}
          </Text>
          <Group noWrap spacing="xs">
            <Group spacing="xs" noWrap>
              <Avatar size={20} radius="xl"
                src={import.meta.env.VITE_CMS + item.author?.data.attributes.thumbnail?.data.attributes?.formats?.thumbnail.url} />
              <Text size="xs">{item.author?.data.attributes.name}</Text>
            </Group>
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {new Date(item.updatedAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  )
}