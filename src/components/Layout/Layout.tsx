import {
  Container,
  Stack,
} from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import K7Header from './K7Header';
import Home from '../../pages/Home';
import Error404 from '../Error/Error404';
import K7Portal from './K7Portal';
import Imprint from '../../pages/Imprint';
import NotReady from '../../pages/NotReady';
import Article from '../Article/Article';
import { useTranslation } from 'react-i18next';
import Department from '../../pages/Department';
import ServiceCollection from '../../pages/ServiceCollection';
import ArticleCollection from '../../pages/ArticleCollection';



export default function Layout() {
  const { t } = useTranslation();
  const links = [
    { link: "projects", label: t('projects.projects') },
    { link: "news", label: t('news') },
  ]
  return (
    <>
      <BrowserRouter>
        <Stack w="100%">
          <K7Header links={links} />
          <Container p={0} fluid w="100%" mih="80vh">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<NotReady text={t("jobs.noJobsAvailable")} />} />
              <Route path="/projects" element={<ArticleCollection type="projects" />} />
              <Route path="/projects/:id" element={<Article />} />
              <Route path="/news/:id" element={<Article />} />
              <Route path="/services" element={<ServiceCollection />} />
              <Route path="/services/:name" element={<Department />} />
              <Route path="/news" element={<ArticleCollection type="blogs" />} />
              <Route path="/team" element={<NotReady text={t('team.missing')} />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </Container>
          <K7Portal />
        </Stack>
      </BrowserRouter>
    </>
  );
}