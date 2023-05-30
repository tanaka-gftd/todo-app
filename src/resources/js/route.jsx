/* Appコンポーネント、ルーティングも担当*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Page from './Pages/Page';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/page' element={<Page />} /> 
      </Routes>
    </BrowserRouter>
  );
}

//index.blade.php内のIDがappとなるdiv要素を取得し、その要素に作成したReactコンポーネントを展開していく
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />)