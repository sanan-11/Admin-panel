import logo from './logo.svg';
import './App.css';
import { Space } from 'antd';
import AppHeader from './Components/AppHeader/AppHeader'
import SideMenu from './Components/SideMenu/SideMenu'
import PageContent from './Components/PageContent/PageContent'
import AppFooter from './Components/AppFooter/AppFooter'

function App() {
  return (
    <div className="App">
     <AppHeader/>
     <div className='SideMenuAndPageContent'>
      <SideMenu/>
      <PageContent/>
     </div>
     <AppFooter/>
    </div>
  );
}

export default App;
