export const chatContentActiveTpl = `
  <div class="chat-info">
      <div class="chat-info__user">
          <div class="nav-user__logo">
              <span></span>
          </div>
          <p class="chat-info__user-title">{{title}}</p>
      </div>
      <div class="chat-info__btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="408px" height="408px" viewBox="0 0 408 408" style="enable-background:new 0 0 408 408;" xml:space="preserve"><g id="more-vert"><path d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51S232.05,306,204,306z"/></g></svg></div>
  </div>
  <div class="chat-messages">
      <div class="chat-messages__inner">
          {{messages}}
      </div>
  </div>
  {{chatAddBtn}}
  {{form}}
`;
