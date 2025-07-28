import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home';
import Finance from '../finance/finance';
import FinanceInd from '../finance/finance-ind';
import FinanceAdd from '../finance/finance-add';
import NotFound from '../../shared_components/not_found/not_found';
import Movie from '../entertainment/movie';
import Health from '../health/health';
import Layout from '../../shared_components/sidebar/layout';

function App() {

  return (
    <>
      <Layout>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/finance' element={<Finance />}></Route>
            <Route path='/finance/:id' element={<FinanceInd />}></Route>
            <Route path='/finance/:id/add' element={<FinanceAdd />}></Route>
            <Route path='/entertainment' element={<Movie />}></Route>
            <Route path='/health' element={<Health />}></Route>
            <Route path='/not-found' element={<NotFound />}></Route>
          </Routes>
        </Router>
      </Layout>
    </>
  )
}

export default App
