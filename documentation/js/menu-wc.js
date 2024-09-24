'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' : 'data-bs-target="#xs-controllers-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' :
                                            'id="xs-controllers-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' : 'data-bs-target="#xs-injectables-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' :
                                        'id="xs-injectables-links-module-AppModule-0c862afd76920508653204856b037365d5a779a5e9401a503e1234a9bf49a3434239d20961ed86a08c12dca9bb44cd09968fe8f3eb30c66c573e2fd53fc6a0e1"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' :
                                            'id="xs-controllers-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' :
                                        'id="xs-injectables-links-module-AuthModule-7e7cd9c809f55d0ea5fd78bc3ca2b5fb837fd45f380661e6cf0017d6e6f698583c06781a1e77e904476a35eddcba257b876dfbc391be6da95a914af7251f3c50"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' :
                                            'id="xs-controllers-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' :
                                        'id="xs-injectables-links-module-PostsModule-1890a128faf793be5ea3ab975426ef70fbfcfe1c8f88f24a0e13b16603bcf307b212f760d12e1f38c4671d1dba65e2229b39af81127c927e48e5889a08894428"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' :
                                            'id="xs-controllers-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' :
                                        'id="xs-injectables-links-module-UsersModule-2eaec6128f35d572256bd350f4ff271d99cca17df1219053847e83851578d68e72056c220deabcc1779aeab7c3be57148e4d316c2254cd5f67098dd7e601eef8"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamsDto.html" data-type="entity-link" >GetUsersParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});