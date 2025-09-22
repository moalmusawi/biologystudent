import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

// Re-using old files for new pages
import TextbooksPage from './pages/AboutPage';
import TeacherGuidePage from './pages/NewsAndEventsPage';
import ExamsPage from './pages/ProjectsPage';
import SummariesPage from './pages/ResourcesPage';
import UnitOnePage from './pages/ExperimentsPage';
import UnitTwoPage from './pages/CompetitionsPage';
import UnitThreePage from './pages/HallOfFamePage';
import UnitFourPage from './pages/QuizPage';
import ContactPage from './pages/ContactPage';


const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-50 text-gray-800">
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/textbooks" element={<TextbooksPage />} />
            <Route path="/teacher-guide" element={<TeacherGuidePage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/summaries" element={<SummariesPage />} />
            <Route path="/unit-1" element={<UnitOnePage />} />
            <Route path="/unit-2" element={<UnitTwoPage />} />
            <Route path="/unit-3" element={<UnitThreePage />} />
            <Route path="/unit-4" element={<UnitFourPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;