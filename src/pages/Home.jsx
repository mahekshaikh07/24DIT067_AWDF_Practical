import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home() {
  const skillList = ['React', 'JavaScript', 'HTML', 'CSS', 'C++'];

  return (
    <>
      <Header name="Mahek" themeColor="#4f46e5" />
      <About />
      <Skills skillList={skillList} />
    </>
  );
}

export default Home;