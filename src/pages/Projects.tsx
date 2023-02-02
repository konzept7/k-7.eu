import { Text, Image, Center, Title, Stack, SimpleGrid } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import Typewriter from '../../assets/illustrations/typewriter.svg'
import K7Page from '../components/Layout/K7Page'
import { ListArticleResponseItem, queryArticles } from '../utils/queryCms'
import ArticleCard from '../components/Article/ArticleCard'
import { useTranslation } from 'react-i18next'


export default function Projects() {
  const [projects, setProjects] = useState<Array<{ id: number, attributes: ListArticleResponseItem }>>([])
  const { t, i18n } = useTranslation()

  useEffect(() => {
    queryArticles("projects", ["cover", "author", "departments"], i18n.resolvedLanguage).then((response) => {
      const p = response.data
      setProjects(p)
    }
    ).catch(error => {
      console.error('error loading projects', error)
      showNotification({
        title: t('projects.errorLoadingTitle'),
        color: "red",
        message: t('projects.errorLoadingMessage')
      })
    })
  }, [i18n.language])

  return (
    <K7Page background='dark'>
      <Stack align="center">
        <Title order={1} mb={30}>{t('projects.projects')}</Title>
        <Text size="lg" mb={30}>{t('projects.selection')}</Text>
        <SimpleGrid cols={2} breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}>
          {projects.map((project) => {
            return (
              <ArticleCard key={project.id} type='projects' data={project} />
            )
          }
          )}
        </SimpleGrid>
      </Stack>
    </K7Page>
  )
}