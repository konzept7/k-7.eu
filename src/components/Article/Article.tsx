import { Center, Group, Loader, Stack, Title, Image, Text, createStyles, Badge, Avatar, Container, Space } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ListArticleResponseItem, colorForStatus, getArticleEntry, ContentFragment } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";
import { useTranslation } from "react-i18next"
import Fragment from "../Fragments/Fragment";
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

const widths = {
  "small": 250,
  "medium": 375,
  "large": "100%",

}

export default function Article() {
  const { classes } = useStyles();
  const [entry, setEntry] = useState<ListArticleResponseItem | undefined>(undefined)
  const location = useLocation();
  const type = location.pathname.split("/").includes("projects") ? "projects" : "blogs";
  const { id } = useParams()
  const { t, i18n } = useTranslation();
  const mediumDisplay = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    getArticleEntry(type, id!, i18n.language).then(e => {
      setEntry(e)
    }).catch((error: any) => {
      console.error(error)
      showNotification({
        title: t('errorLoading'),
        color: "red",
        message: t('errorLoadingArticle')
      })
    })
  }, [i18n.language])

  if (!entry) return (
    <K7Page background={"dark"}>
      <Group position="left" mb={20}>
        <IconArrowLeft />
        <Link to={type === "projects" ? "/projects" : "/blog"}>{t('article.back')}</Link>
      </Group>
      <Center>
        <Stack>
          <Loader size="xl" />

        </Stack>
      </Center>
    </K7Page>
  )

  const cover = entry?.cover?.data.attributes.formats?.small.url ?? entry?.cover?.data.attributes?.url
  const tags = entry?.tags?.split(",").map(t => t.trim())

  return (
    <Container maw={1024}>
      <Group position="left" my={30}>
        <IconArrowLeft />
        <Link to={type === "projects" ? "/projects" : "/blog"}>{t('article.back')}</Link>
      </Group>
      <Stack>
        <Group position="apart">
          <Stack spacing={0} justify="flex-start">
            {
              entry.departments?.data.map((department) => <Text transform="uppercase" color="dimmed" lh={1.1} weight={700} size="xs" key={department.id}>{department.attributes.name}</Text>)
            }
          </Stack>
          {entry.status && <Badge variant="dot" color={colorForStatus(entry.status!)}>{entry.status!}</Badge>}
        </Group>
        <Group spacing={0} w="100%" noWrap={mediumDisplay}>
          <Stack ta="left" w="100%" spacing={5}>
            <Group noWrap spacing="xs">
              <Avatar size={20} src={entry.author?.data.attributes.thumbnail} />
              <Text size="md">{entry.author?.data.attributes.name}</Text>
              <Text size="md" color="dimmed">
                •
              </Text>
              <Text size="md" color="dimmed">
                {new Date(entry.updatedAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </Group>
            <Title>{entry.title}</Title>
            <Text my="lg" italic size="md" color="dimmed">
              {entry.description}
            </Text>
          </Stack>
          <Image src={import.meta.env.VITE_CMS + cover} height={140} width={140} />
        </Group>
        <div >
          {entry.content?.map((f: ContentFragment) => <Fragment key={f.id} {...f} />)}
        </div>
        <Text size="sm" color="dimmed">
          {t('article.publishedAt')} {new Date(entry.createdAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}
          {' '} {t('by')} {' ' + entry.author?.data.attributes.name}<br />
          {t('article.updatedAt')} {new Date(entry.updatedAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}.
        </Text>
        <Group position="right">
          {tags?.map((tag, index) => <Badge variant="filled" key={index} color="orange" radius="xs">{tag}</Badge>)}
        </Group>
        <Space h={30} />
      </Stack>
    </ Container >
  )
}