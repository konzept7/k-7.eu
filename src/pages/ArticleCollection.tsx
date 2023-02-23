import { Text, Image, Center, Title, Stack, SimpleGrid } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import Typewriter from '../../assets/illustrations/typewriter.svg'
import K7Page from '../components/Layout/K7Page'
import { CollectionQueryType, ListArticleResponseItem, queryArticles } from '../utils/queryCms'
import ArticleCard from '../components/Article/ArticleCard'
import { useTranslation } from 'react-i18next'

interface ArticleCollectionProps {
  type: CollectionQueryType
}

export default function ArticleCollection({ type }: ArticleCollectionProps) {
  const [articles, setArticles] = useState<Array<{ id: number, attributes: ListArticleResponseItem }>>([])
  const { t, i18n } = useTranslation()

  useEffect(() => {
    queryArticles(type, ["cover", "author", "departments"], i18n.resolvedLanguage).then((response) => {
      const p = response.data.sort((a, b) => a.attributes.updatedAt < b.attributes.updatedAt ? 1 : -1)
      setArticles(p)
    }
    ).catch(error => {
      console.error('error loading projects', error)
      showNotification({
        title: t('projects.errorLoadingTitle'),
        color: "red",
        message: t('article.errorLoading.' + type)
      })
    })
  }, [i18n.language, type])

  return (
    <K7Page background='dark'>
      <Stack align="center">
        <Title order={1} mb={30}>{t('article.' + type)}</Title>
        <Text size="lg" mb={30}>{t('article.selection.' + type)}</Text>
        <SimpleGrid cols={2} breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}>
          {articles.map((project) => {
            return (
              <ArticleCard key={project.id} type={type} data={project} />
            )
          }
          )}
        </SimpleGrid>
      </Stack>
    </K7Page>
  )
}