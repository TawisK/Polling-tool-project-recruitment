import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
    
interface PollAnswer {
  name: string
  indexName: string
  image: string
}

interface VotesResponse {
  answers: Array<VoteResult>
}

interface VoteResult {
  _id: string
  name: string
  count: number
}
/*
interface VotedAnswer {
  
}*/

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) {}
    title = 'intern-task';
    event = 'vote';
    vote = '';
    voted = false;
    sports: Array<PollAnswer> = [
      {
        name: 'Soccer',
        indexName: 'soccer',
        image: 'assets/img/soccer.png',
      },
      {
        name: 'Volleyball',
        indexName: 'volleyball',
        image: 'assets/img/volleyball.png',
      },
      {
        name: 'Basketball',
        indexName: 'basketball',
        image: 'assets/img/basketball.png',
      },
      {
        name: "Ice Hockey",
        indexName: 'hockey',
        image: 'assets/img/hockey.png',
      },
    ];

    async getVoteResults() : Promise<VotesResponse>{
      return await this.http
          .get<VotesResponse>(`http://localhost:4000/answers`)
          .toPromise();
    }

    voteCount!: Array<VoteResult>

      
    async castVote(answer: string) {
      const element = this.voteCount.find(({ name }) => name === answer);
      console.log(element?.count);
      this.http
        .post(`http://localhost:4000/vote`, { element })
        .subscribe((res: any) => {
          this.vote = res.answer;
          this.voted = true;
        });

      this.voteCount = (await this.getVoteResults()).answers
      //console.log(element?.count);
      const hiding = document.getElementById("pollList");
      hiding!.style.display = "none";
      const flexing = document.getElementById("results");
      flexing!.style.display = "block";
      }
      
      getVoteClasses(answer: string) {
        return {
          elect: this.voted && this.vote === answer,
          lost: this.voted && this.vote !== answer,
        };
      }

      async ngOnInit (): Promise<void> {
        this.voteCount = (await this.getVoteResults()).answers
      }
    }
