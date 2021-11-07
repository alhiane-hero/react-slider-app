import {useEffect, useState} from 'react';
import data from './Data';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import './sass/all.scss';

function App() {
  const [people] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(_ => {
    const lastIndex = people.length - 1;
    if (index > lastIndex) {
      setIndex(0)
    }
    if (index < 0) {
      setIndex(lastIndex);
    }
  }, [people, index]);

  useEffect(_ => {
    const interval = window.setInterval(_ => {
      setIndex(index + 1);
    }, 5000);
    return _ => {
      window.clearInterval(interval);
    }
  }, [index]);

  return (
    <div className="App">
      <div className='Title'>
        <span>/</span> Reviews
      </div>
      <section className='Slider'>
        {
          people.map((person, personIndex) => {
            const {id, image, name, title, quote} = person;

            let position='NextSlide';

            if (index === personIndex) {
              position ='ActiveSlide';
            }

            if (
              index - 1 === personIndex ||
              (index === 0 && personIndex === people.length -1)
              ) {
              position = 'PrevSlide';
            }

            return (
              <div className={`Slide ${position}`}
              key={id}>
                <img src={image} alt={name} />
                <h4 className='SlideName'>{name}</h4>
                <h4 className='SlideTitle'>{title}</h4>
                <p className='SlideQuote'>
                  {quote}
                </p>
                <span className='Icon'>
                  <FaQuoteRight />
                </span>
              </div>
            )
          })  
        }
        <button className='Btn Prev' onClick={_ => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className='Btn Next' onClick={_ => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </section>
    </div>
  );
}

export default App;
