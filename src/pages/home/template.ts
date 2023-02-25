export const template = `
    {{tempNav}}
    <main>
        <div class="chat">
            <div class="chat__nav">
                <div class="nav-info">
                    <form class="search">
                        <label>
                            <input type="text" class="input-text" placeholder="{{search_placeholder}}">
                        </label>
                        <button class="search__button"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg></button>
                    </form>
                    {{profileLink}}
                </div>
                <div class="nav-users">
                    {{chatList}}
                </div>
            </div>
            <div class="chat__content">
                <div class="chat__change-message">{{chatAddText}}<br> {{chatAddBtn}} </div>
                <!--<div class="chat-info">
                    <div class="chat-info__user">
                        <div class="nav-user__logo">
                            <span></span>
                        </div>
                        <p class="chat-info__user-title">Василий</p>
                    </div>
                    <div class="chat-info__btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="408px" height="408px" viewBox="0 0 408 408" style="enable-background:new 0 0 408 408;" xml:space="preserve"><g id="more-vert"><path d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,306,204,306z"/></g></svg></div>
                </div>
                <div class="chat-messages">
                    <div class="chat-messages__inner">
                        <div class="chat-messages__date">19 июня</div>
                        <div class="chat-post">
                            <div class="chat-post__text">
                                <div class="chat-post__date"><span>11:56</span></div>
                                <p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>
                                <p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>
                                
                            </div>
                        </div>
                        <div class="chat-post">
                            <div class="chat-post__image">
                                <img src="https://www.businka-k-businke.ru/image/cache/data-soputstv-feathers-pustelga-400x400.jpg" alt="">
                                <div class="chat-post__date chat-post__image-date"><span>11:56</span></div>
                            </div>
                        </div>
                        <div class="chat-post chat-post_my">
                            <div class="chat-post__text chat-post__text_my">
                                <div class="chat-post__date"><span>12:56</span></div>
                                <div class="chat-post_check"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="24" height="24"viewBox="0 0 24 24"> <path d="M 12 2 C 6.486 2 2 6.486 2 12 C 2 17.514 6.486 22 12 22 C 17.514 22 22 17.514 22 12 C 22 10.874 21.803984 9.7942031 21.458984 8.7832031 L 19.839844 10.402344 C 19.944844 10.918344 20 11.453 20 12 C 20 16.411 16.411 20 12 20 C 7.589 20 4 16.411 4 12 C 4 7.589 7.589 4 12 4 C 13.633 4 15.151922 4.4938906 16.419922 5.3378906 L 17.851562 3.90625 C 16.203562 2.71225 14.185 2 12 2 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"></path></svg></div>
                                <p>Круто!</p>
                            </div>
                        </div>
                        <div class="chat-post">
                            <div class="chat-post__text">
                                <div class="chat-post__date"><span>11:56</span></div>
                                <p>Тоже так думаю</p>
                            </div>
                        </div>
                    </div>
                </div>
                {{form}}-->
            </div>
        </div>
    </main>
    
    {{chatAddModal}}
`;
