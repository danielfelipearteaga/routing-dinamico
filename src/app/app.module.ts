import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { PostComponent } from './component/post/post.component';
import { EmptyComponent } from './component/empty/empty.component';
import { SimplePageComponent } from './component/simple-page/simple-page.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';

import { RoutingService } from './service/routing.service';

import { HttpClientModule } from '@angular/common/http';

export function routingService(routing: RoutingService) {
  return (): Promise<any> => {
    return routing.searchRouting();
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostComponent,
    EmptyComponent,
    SimplePageComponent,
    PagenotfoundComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [
    RoutingService,
    {
      provide: APP_INITIALIZER,
      useFactory: routingService,
      deps: [RoutingService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
