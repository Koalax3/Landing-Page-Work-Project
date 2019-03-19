import Typewriter from 't-writer.js'

function tWriter() {
    const target = document.querySelector('.tw');
    console.log(target);
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: '#ecf0f1',
      cursorColor: '#ecf0f1'
    })
    
    writer
      .type('Serez-vous ...')
      .rest(500)
      .remove(3)
      .type('Villageois ')
      .rest(200)
      .type('?')
      .rest(1000)
      .remove(12)
      .type('Loup-garou ')
      .rest(200)
      .type('?')
      .rest(1000)
      .remove(12)
      .type('Sorcière ')
      .rest(200)
      .type('?')
      .rest(1000)
      .remove(10)
      .type('Voyante ')
      .rest(200)
      .type('?')
      .rest(1000)
      .remove(9)
      .type('Loup Blanc ')
      .rest(200)
      .type('?')
      .rest(1000)
      .remove(24)
      .type('Serez-vous sur Loup-garou.fr ')
      .rest(400)
      .type('?')
      .rest(2000)
      .start()
}

export default tWriter;