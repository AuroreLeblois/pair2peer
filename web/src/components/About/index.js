import React from 'react';
import Max from './Max.png';
import Victor from './Victor.png';
import Aurore from './Aurore.png';
// == Import css

// == Composant
const About = () => {
  return(
    <section id="presentation">
       <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
   <article class="card-of-team">
      <div class="columns is-mobile">
      <div class="column">
      <div class="card">
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
          <p class="title is-4">Charles Phonepraseuth</p>
          <p class="subtitle is-6">  Product Owner, Lead Dévoloppeur-Back</p>
        </div>
      </div>

=======
  

      <div class="content">
         Product Owner, Lead devolopper-back
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
<div class="card">
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
   Ah ben non tant que vous nous obligez pas à les manger! Non Provençal c’est mon nom.
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
<div class="card">
  <div class="card-image">
    <figure class="image is-one-third">
    <img src={Victor} alt="Victor, notre git master"/>
    </figure>
  </div>
 <div class="card-content">
<div class="media">
  <div class="media"> 
  </div>
  <div class="media-content">
    <p class="title is-4">Victor Greiveldinger</p>
    <p class="subtitle is-6">Git Master, Développeur Front-End</p>
  </div>
</div>
<div class="content">
   Ah ben non tant que vous nous obligez pas à les manger! Non Provençal c’est mon nom.
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
<div class="card">
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
   Ah ben non tant que vous nous obligez pas à les manger! Non Provençal c’est mon nom.
   <br></br>
  <a href="#">#css</a> <a href="#">#responsive</a>
  <br></br>
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
