import React from 'react';
import './App.scss';
import axios from "axios";
import One from './assets/image/one.png';
import Two from './assets/image/two.png';
import Three from './assets/image/three.png';
import Four from './assets/image/four.png';
import Five from './assets/image/five.png';

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <div className="accordion-wrapper">
      
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
        >
        {title}
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        {/* {title == 'Time' && <div className='clock'>
            <img src={Five} alt="Five"/>
          </div>} */}
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

function App() {
  const [spaceData, setSpaceData] = React.useState(null);
  const [darkTheme, setDarkTheme] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const baseURL = "http://localhost:4000/space";

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setSpaceData(response.data.data);
    });
  }, []);
  const handleDark = () =>{
    setDarkTheme(true);
  }

  const handleLight = () =>{
    setDarkTheme(false);
  }
  const handleChange = e => {
    const id = e.target.id;
    setSpaceData(prevState => {
      return (
        prevState.map(
          li => {
            return(li.id === +id ? { ...li,
            value: !li.value
          } : li)}
        )
      )
    });
  };
  // handleAllChecked = event => {
  //   let fruites = this.state.fruites;
  //   fruites.forEach(fruite => (fruite.isChecked = event.target.checked));
  //   this.setState({ fruites: fruites });
  // };
  return (
    <div className={`${darkTheme ? 'dark' : 'App'}`}>
      <div class="sidebar">
        <div className='home_side'>
          <a class="active" href="#home">
            <img src={One} alt="one"/>
          </a>
          <a href="#news">
            <img src={Two} alt="Two"/>
          </a>
        </div>
        <div className='theme_side'>
          <a href="#contact" onClick={handleLight}>
            <img src={Three} alt="Three"/>
          </a>
          <a href="#about" onClick={handleDark}>
            <img src={Four} alt="Four"/>
          </a>
        </div>
      </div>
      <div className='fluid-container'>
        <Accordion title="Space Data">
          
          <Accordion title="Time">
            {/* <Accordion title=""> */}
              <ul>
                {spaceData && spaceData.map((item,i)=>{
                  return(
                    <div className='show_data'>
                      {/* <input
                        type="checkbox"
                        onClick={handleAllChecked}
                        value="checkedall"
                      />{" "}
                      Select All */}
                      <input
                          type="checkbox"
                          id={item.id}
                          checked={item.value}
                          onChange={handleChange}
                      />
                      <li key={i}> 
                          {item.path.split('/').pop()}{' '}({item.size})
                      </li>
                    </div>
                    
                  )
                })}
              </ul>
          {/* </Accordion> */}
        </Accordion>
      </Accordion>
      </div>
    </div>
  );
}

export default App;
