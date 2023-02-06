import { Center, Group, Loader, Stack, Title, Image, Text, createStyles, Badge, Avatar, Space } from "@mantine/core";
import { useDocumentTitle, useMediaQuery } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconArrowLeft } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ListArticleResponseItem, colorForStatus, getArticleEntry, ContentFragment } from "../../utils/queryCms";
import K7Page from "../Layout/K7Page";
import { useTranslation } from "react-i18next"
import Fragment from "../Fragments/Fragment";
import { createArticleLd, createBreadcrumbLd } from "../../utils/seo";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    cursor: 'pointer',
  },

  title: {
    fontSize: '2rem',
    fontWeight: 900,
    textUnderlineOffset: "-0.2em",
    textDecorationLine: "underline",
    textDecorationThickness: "0.15em",
    textUnderlinePosition: "under",
    textDecorationSkipInk: "none",
    color: theme.colorScheme === 'dark' ? '#fff' : '#000',
    textDecorationColor: theme.colors.brand[6],
    textAlign: "left",
    textShadow: "-2px -2px 4px rgba(0, 0, 0, 1),2px 2px 4px rgba(0,0,0, 1);",
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: '1.8rem',
    },
  },
  description: {
    fontSize: '1.2rem',
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
  const { classes, theme } = useStyles();
  const [entry, setEntry] = useState<ListArticleResponseItem | undefined>(undefined)
  const location = useLocation();
  const type = location.pathname.split("/").includes("projects") ? "projects" : "blogs";
  const { id } = useParams()
  const { t, i18n } = useTranslation();
  const mediumDisplay = useMediaQuery('(min-width: 768px)');
  const [title, setTitle] = useState('K7-Konzept Karlsruhe GmbH');
  useDocumentTitle(title);


  useEffect(() => {
    getArticleEntry(type, id!, i18n.resolvedLanguage).then(e => {
      setTitle("K7: " + e.title)
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

  const cover = entry?.cover?.data?.attributes?.formats?.small.url ?? entry?.cover?.data.attributes?.url
  const tags = entry?.tags?.split(",").map(t => t.trim())

  const articleLd = createArticleLd(type, id!, entry)
  const breadCrumbsLd = createBreadcrumbLd(type, entry.title, id!)



  return (
    <article>
      <meta name="description" content={entry.description} />
      <meta name="keywords" content={entry.tags} />
      <meta property="og:type" content="website" />
      <meta name="og:description" content={entry.description} />
      <meta property="og:title" content={"K7: " + entry.title} />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:site_name" content={"K7 " + entry.title} />
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify([articleLd, breadCrumbsLd]) }} />
      <K7Page background={"dark"} py={0}>
        <Group position="left" my={30}>
          <IconArrowLeft />
          <Link to={type === "projects" ? "/projects" : "/news"}>{t('article.back')}</Link>
        </Group>
      </K7Page>
      <Stack>
        <Group position="apart">
          <Stack spacing={0} justify="flex-start">
            {
              entry.departments?.data.map((department) => <Text transform="uppercase" color="dimmed" lh={1.1} weight={700} size="xs" key={department.id}>{department.attributes.name}</Text>)
            }
          </Stack>
          {entry.status && <Badge variant="dot" color={colorForStatus(entry.status!)}>{entry.status!}</Badge>}
        </Group>
        <K7Page background={"dark"} py={0}>
          <header>
            <Group spacing={0} w="100%" noWrap={mediumDisplay}>
              <Stack ta="left" w="100%" spacing={5}>
                <Group noWrap spacing="xs">
                  <Avatar size={30} radius="xl"
                    src={import.meta.env.VITE_CMS + entry.author?.data.attributes.thumbnail?.data.attributes?.formats?.thumbnail.url} />
                  <Text size="md">{entry.author?.data.attributes.name}</Text>
                  <Text size="md" color="dimmed">
                    •
                  </Text>
                  <Text size="md" color="dimmed">
                    {new Date(entry.updatedAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}
                  </Text>
                </Group>
                <Title className={classes.title}>{entry.title}</Title>
                <Text my="lg" italic size="lg" className={classes.description} color={theme.white}>
                  {entry.description}
                </Text>
              </Stack>
              <Image src={import.meta.env.VITE_CMS + cover} height={140} width={140}
                alt={entry?.cover?.data?.attributes?.alternativeText} />
            </Group>
            {
              entry.article_collection && (<>
                <Text mt="sm" mb="md" italic size="lg" color={theme.white}>
                  {t('article.partOfSeries')}
                  "{entry.article_collection.data.attributes.name}" - {entry.article_collection.data.attributes.description}:
                </Text>
                <Stack spacing="xs">
                  {
                    entry.article_collection.data.attributes.blogs?.data.map((blog: { id: number, attributes: ListArticleResponseItem }, i) =>
                      <Link key={blog.id} style={{ marginLeft: theme.spacing.lg }} to={"/news/" + blog.id}>
                        {t('article.part')} {i + 1}: {blog.attributes.title}
                      </Link>
                    )}
                </Stack>
              </>
              )
            }
          </header>
        </K7Page>
        <div >
          {entry.content?.map((f: ContentFragment) => <section key={f.id}><Fragment {...f} /></section>)}
        </div>
        <K7Page background={"dark"} py={0}>
          <footer>
            <Text size="sm" color="dimmed">
              {t('article.publishedAt')} {new Date(entry.createdAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}
              {' '} {t('by')} {' ' + entry.author?.data.attributes.name}<br />
              {t('article.updatedAt')} {new Date(entry.updatedAt).toLocaleDateString(i18n.language ?? "de", { year: 'numeric', month: 'long', day: 'numeric' })}.
            </Text>
            <Group position="right">
              {tags?.map((tag, index) => <Badge variant="filled" key={index} color="orange" radius="xs">{tag}</Badge>)}
            </Group>
          </footer>
        </K7Page>
        <Space h={30} />
      </Stack>
    </ article>
  )
}