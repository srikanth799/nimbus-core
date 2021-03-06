/**
 * @license
 * Copyright 2016-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import { HttpClientModule } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from 'ng-bullet';
import { ConfigService } from '../../services/config.service';
import { CustomHttpClient } from '../../services/httpclient.service';
import { LayoutService } from '../../services/layout.service';
import { LoaderService } from '../../services/loader.service';
import { PageService } from '../../services/page.service';
import { setup } from '../../setup.spec';
import { Paragraph } from '../platform/content/paragraph.component';
import { Link } from '../platform/link.component';
import { LoginLayoutCmp } from './login-layout.component';

let layoutService, configService;

class MockLayoutService {
  layout$: EventEmitter<any>;

  constructor() {
    this.layout$ = new EventEmitter<any>();
  }

  loadLayout(val) {
    this.layout$.next(val);
  }
  getLayout(param) {
    return 'test';
  }
}

const declarations = [LoginLayoutCmp, Link, Paragraph];
const imports = [RouterTestingModule, HttpClientModule, HttpModule];
const providers = [
  { provide: LayoutService, useClass: MockLayoutService },
  CustomHttpClient,
  PageService,
  LoaderService,
  ConfigService
];
let fixture, hostComponent;

describe('LoginLayoutCmp', () => {
  configureTestSuite(() => {
    setup(declarations, imports, providers);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLayoutCmp);
    hostComponent = fixture.debugElement.componentInstance;
    layoutService = TestBed.get(LayoutService);
    configService = TestBed.get(ConfigService);
  });

  it('should create the LoginLayoutCmp', async(() => {
    expect(hostComponent).toBeTruthy();
  }));

  // it('ngoninit() should get branding, footer, topMenuItems',  async(() => {
  //   const logo = new Param(configService);
  //   let branding: AppBranding = {} as AppBranding;
  //   branding.logo = logo;
  //   let headerMenusItem: Param;
  //   const headerMenus: Param[] = [headerMenusItem]
  //   let Footer: FooterConfig;
  //   const result = {
  //     topBar: {
  //       branding: branding,
  //       headerMenus: headerMenus
  //     },
  //     menu: 456,
  //     footer: Footer
  //   };
  //   hostComponent.ngOnInit();
  //   layoutService.loadLayout(result);
  //   expect(hostComponent.branding).toEqual(branding);
  //   expect(hostComponent.footer).toEqual(Footer);
  //   expect(hostComponent.topMenuItems).toEqual(headerMenus);
  // }));
});
