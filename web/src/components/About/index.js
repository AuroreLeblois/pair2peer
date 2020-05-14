import React from 'react';
import Max from './Max.png';
import Victor from './Victor.png';
import Aurore from './Aurore.png';
import Charles from './Charles.png';
// == Import css
import './style.css';

// == Composant
const About = () => {
  return(
  

    <section id="presentation">
        <section class="hero">
  <div class="hero-body">
    <div class="container">
      <h1 class="title is-in-center">
       Notre dream team
      </h1>
    </div>
  </div>
  </section>
      <div class="take-all-space is-three-quarters-mobile is-two-thirds-tablet is-half-desktop  is-one-quarter-fullhd">
        <article class="card-of-team">
          <div class="columns is-mobile">
            <div class="column">
              <div class="card contouring">
                <div class="card-image">
                  <figure class="image is-one-third">
                    <img src={Charles} alt="Charles, notre product owner"/>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media"> 
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Charles Phonepraseuth</p>
                      <p class="subtitle is-6">  Product Owner, Lead Dévoloppeur-Back</p>
                    </div>
                  </div>
                  <div class="content">
                  Moi, prochaine bataille rangée je reste à Kaamelott. On plaisante, on plaisante… Ah, ben tourné vers là-bas c'est sûr, moi non plus je vois rien. La vache! Ca vous rend pas aimable en tout cas, hein!
                    <br/>
                    <a href="#">linkedin</a> <a href="#">Autres projets</a>
                    <br/>
                    <time datetime="2020">2020</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="card-of-team">
          <div class="columns is-mobile">
            <div class="column">
              <div class="card contouring">
                <div class="card-image">
                  <figure class="image is-one-third">
                    <img src={Max} alt="Max, notre lead dev front"/>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media"> 
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Maximilien Bec</p>
                      <p class="subtitle is-6">Lead Développeur-Front, référent technique React</p>
                    </div>
                  </div>
                  <div class="content">
                  Alors vous allez peut-être me dire que maintenant ils croient qu'on est là-bas? Je suis chef de guerre moi, je suis pas là pour secouer des drapeaux et jouer de la trompette. Ah ben un peu oui, surtout que s'ils ont vu d'où venait la pierre ils sont en train de radiner droit sur nous! Il s’est fait chier dessus par un bouc! Mais Attila vous y attend, Sire! Attila! Le Fléau de Dieu!
                    <br/>
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br/>
                    <time datetime="2020">2020</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="card-of-team">
          <div class="columns is-mobile">
            <div class="column">
              <div class="card contouring">
                <div class="card-image">
                  <figure class="image is-one-third victor">
                    <img src={Victor} alt="Victor, notre git master"/>
                  </figure>
                </div>
                <div class="card-content fixed-long">
                  <div class="media">
                    <div class="media"> 
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Victor Greiveldinger</p>
                      <p class="subtitle is-6">Git Master, Développeur Front-End</p>
                    </div>
                  </div>
                  <div class="content">
                  Oh ben ça va on plaisante! C’est du patrimoine ça? Allez en garde ma mignonne!
                    <br/>
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br/>
                    <time datetime="2020">2020</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article class="card-of-team">
          <div class="columns is-mobile">
            <div class="column">
              <div class="card contouring">
                <div class="card-image">
                  <figure class="image is-one-third">
                    <img src={Aurore} alt="Aurore, scrum master"/>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media"> 
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Aurore Leblois</p>
                      <p class="subtitle is-6">Scrum Master, Développeuse Back-End</p>
                    </div>
                  </div>
                  <div class="content">
                  Là c’est une table ronde. Pour que les chevaliers de Bretagne se réunissent autour. Toute façon autant vous y faire parce qu’à partir de maintenant on va s’appeler «Les Chevaliers de la Table Ronde». Et alors c'est pas permis? A genoux, pas à genoux c’est une chose... Enfin en attendant je vous donne pas tout notre or.
                    <br/>
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br/>
                    <time datetime="2020">2020</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
// == Export
export default About;
