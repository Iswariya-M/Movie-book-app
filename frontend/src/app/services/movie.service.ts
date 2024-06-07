import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService  {
  private movies: any[] = [
      { 
        id: 1,
        title: 'Manjummel boys',
        imageUrl: "../../../assets/image1.jpg",
        genre: 'Drama',
        description:'The movie showcases the story of a group of friends in 2006. The movie begins with the story of group of men embarking on a journey to the renownned Gunaa caves. The place has been named after Kamal Haasan iconic 1991 film shot in the same location.',
        rating: 8.5
      },
      { 
        id: 2,
        title: 'DeAr',
        imageUrl: "../../../assets/image2.jpg",
        genre: 'Romance',
        description:'A newly married couple faces challenges when the wife snoring interrupts the husband sleep, and they must make compromises.',
        rating: 8.5
      },
      { 
        id: 3,
        title: 'The Family Star',
        imageUrl: "../../../assets/image.avif",
        genre: 'Drama',
        description:"Govardhan (Vijay Deverakonda), a middle-class young man, is an architect who works for a small company in Hyderabad and is always burdened with many financial and family issues. He meets a college student Indhu (Mrunal Thakur), who rents the top level of her house and quickly becomes close to Govardhan's family.",
        rating: 8.5
      },
      { 
        id: 4,
        title: 'Premalu',
        imageUrl: "../../../assets/image3.jpg",
        genre: 'Romance',
        description:"In the film, Sachin Santhosh, a graduate from Kerala, plans on moving to the United Kingdom, but instead goes to Hyderabad and take a GATE course, where he meets and falls in love with Reenu Roy, an employee of an IT company.",
        rating: 7.1
      },
      { 
        id: 5,
        title: 'Ghilli',
        imageUrl: "../../../assets/image4.jfif",
        genre: 'Action',
        description:"A Kabaddi player goes to Madurai to participate in a match, but instead rescues a woman from a gang leader who is obsessed with her.",
        rating: 7.1
      },
      { 
        id: 6,
        title: 'Rathnam',
        imageUrl: "../../../assets/image 5.jpg",
        genre: 'Drama',
        description:"Rathnam (Vishal), son of a vegetable vendor, saves a local kind-hearted rowdy Paneer Selvam (Samuthirakani) by stabbing his enemy. This enables Paneer Selvam's rise as he later becomes an MLA, with Rathnam as his 'right hand' man. The two run a Kangaroo court with a cause — offering us the same old Godfather conundrum.",
        rating: 7.1
      },
      { 
        id: 7,
        title: 'GODZILLA X KONG : THE NEW EMPIRE',
        imageUrl: "../../../assets/image6.jfif",
        genre: 'Action',
        description:"The new installment in the Monsterverse puts the mighty Kong and the fearsome Godzilla against a colossal deadly threat hidden within our world that threatens the existence of their species and our very own, as well as diving deep into the mysteries of Skull Island and beyond.",
        rating: 7.1
      },
      { 
        id: 8,
        title: 'Master',
        imageUrl: "../../../assets/image7.jpg",
        genre: 'Action',
        description:" An alcoholic professor, who takes a three-month teaching job in a juvenile home and clashes with a ruthless gangster named Bhavani, who uses the children as the scapegoat for his criminal activities.",
        rating: 8.5
      },
      { 
        id: 9,
        title: 'Soorarai Pottru',
        imageUrl: "../../../assets/image8.jpg",
        genre: 'Biographical',
        description:" Nedumaaran Rajangam, nicknamed Maara, is a former Indian Air Force captain who dreams of starting a low-cost carrier airline. He idolises Paresh Goswami, the owner of Jaz Airlines. One day, Maara is visited by Sundari Bommi, whose family is looking for a groom for her.",
        rating: 8.5
      },
      { 
        id: 10,
        title: 'Ka Pae Ranasingam',
        imageUrl: "../../../assets/image9.jpg",
        genre: 'Drama',
        description:"Based on a true story, the film follows Ariyanachi (Aishwarya Rajesh), a poor woman who strives to bring her deceased husband's body back to India from Dubai, battling the odds of political agenda, corruption and a treacherous bureaucracy that stand in her way.",
        rating: 8.0
      }, 
  ];

  constructor() { }

  getAllMovies(): any[] {
    return this.movies;
  }

  getMovieById(id: number): any {
    return this.movies.find(movie => movie.id === id);
  }
}
