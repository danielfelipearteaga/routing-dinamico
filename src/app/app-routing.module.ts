import { NgModule, OnDestroy } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
// import { EmptyComponent } from './component/empty/empty.component';
// import { HomeComponent } from './component/home/home.component';
// import { PostComponent } from './component/post/post.component';
import { Route } from './model/route';
import { RoutingService } from './service/routing.service';
// import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

const routes: Routes = [
  //  {
  //    path: 'home',
  //    component: HomeComponent,
  //    data: { title: '', description: 'Un nuevo lenguaje' },
  //  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnDestroy {

  private subRouting: Subscription = new Subscription();

  private Ruta: string;
  private RutaComponente: string;
  private NombreComponente: string;

  constructor(private router: Router, private routingService: RoutingService) {
    this.Ruta = '';
    this.RutaComponente = 'component/home/home';
    this.NombreComponente = 'HomeComponent';

    //this.getRoutesStatic();
    this.getRoutesDynamic();
  }

  // getRoutesStatic() {
  //   const config = this.router.config;
  //   config.push({
  //     path: this.Ruta,
  //     component: require('./' + this.RutaComponente + '.component')[
  //       this.NombreComponente
  //     ],
  //   });
  //   this.router.resetConfig(config);
  // }

  getRoutesDynamic() {

    this.subRouting = this.routingService.getRouting()
    .subscribe(({ response }) => {

      const config = this.router.config;

      response.DataSource.forEach(({path, rootcomponent, component}) => {

        config.push({
          path: path,
          component: require(`./${ rootcomponent }.component`)[component]
        })

      });

      config.push({
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      });

      config.push({
        path: '**',
        component: PagenotfoundComponent, // no veo razón de require aquí
      });

      this.router.resetConfig(config);
    });
  }

  ngOnDestroy(): void {
    this.subRouting.unsubscribe();
  }
}
