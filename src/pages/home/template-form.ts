export const templateForm = `
    <button type="button" class="chat-write__add-btn"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="641.852px" height="641.852px" viewBox="0 0 641.852 641.852" style="enable-background:new 0 0 641.852 641.852;" xml:space="preserve"><g><g><g><path d="M176.276,641.852c-41.34,0-82.681-15.732-114.152-47.205c-62.937-62.949-62.93-165.355,0.019-228.291L394.002,34.497c46.005-45.999,120.848-45.992,166.84,0c22.53,22.529,34.81,52.161,34.81,83.658c0,31.497-12.285,61.128-34.58,83.417L254.876,507.74l-4.062,3.629c-25.989,25.627-67.976,25.514-93.838-0.336l-0.609-0.621c-12.439-12.434-19.375-29.162-19.375-46.939c0-17.781,6.937-34.512,19.521-47.09l159.053-159.059c6.193-6.201,16.24-6.201,22.436,0c6.2,6.194,6.2,16.24,0,22.434L178.954,438.824c-6.594,6.594-10.224,15.352-10.224,24.656c0,9.303,3.63,18.061,10.224,24.652l0.609,0.623c13.441,13.441,35.565,13.438,49.153-0.15l309.918-309.463c16.304-16.304,25.284-37.958,25.284-60.982c0-23.024-8.98-44.678-25.284-60.982c-33.857-33.864-88.563-33.864-122.199-0.234L84.577,388.789c-50.574,50.568-50.581,132.854-0.019,183.416c50.581,50.568,132.868,50.568,183.429,0L599.841,240.34c6.2-6.201,16.24-6.201,22.434,0c6.201,6.194,6.201,16.24,0,22.435L290.422,594.641C258.958,626.111,217.616,641.852,176.276,641.852z"/></g></g></g></svg></button>
    <div class="chat-write__text-block">
        {{messageBlock}}
    </div>
    <button class="chat-write__send-btn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M4.667 26.307v-7.983l17.143-2.304-17.143-2.304v-7.983l24 10.285z"></path></svg></button>
`;