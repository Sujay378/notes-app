import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note } from 'src/app/shared/models/generic.model';
import { AppState } from 'src/app/shared/models/store.model';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css'],
})
export class NoteViewComponent implements OnInit {
  selectedDoc: Note | null = null;

  constructor(
    private store: Store<AppState>,
    private _noteService: NoteService
  ) {}

  ngOnInit(): void {
    // this._noteService.selectNote.subscribe((note) => (this.selectedDoc = note));
    this.selectedDoc = {
      noteTitle: 'test title',
      pages: [
        {
          pageTitle: 'test title',
          sections: [
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
          ],
        },
        {
          pageTitle: 'test title',
          sections: [
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
          ],
        },
        {
          pageTitle: 'test title',
          sections: [
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
            {
              header: 'This is for test',
              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde eaque error magnam animi? Quia dicta aspernatur deleniti dolores a praesentium incidunt similique sint aliquam, odio id exercitationem illo repudiandae ratione deserunt. Quaerat repellendus molestias itaque, omnis quis, placeat officiis iusto nobis, corporis harum vel possimus distinctio beatae quidem quae voluptate',
            },
          ],
        },
      ],
    };
  }
}
