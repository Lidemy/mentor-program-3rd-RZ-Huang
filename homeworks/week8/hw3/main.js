const container = document.querySelector('#container');

function GetTop20(res) {
  const data = res.streams;
  for (let i = 0; i < data.length; i += 1) {
    const channelSatus = data[i].channel.status;
    const channelName = data[i].channel.display_name;
    const previeImage = data[i].preview.large;
    const logoImage = data[i].channel.logo;
    container.innerHTML += `
      <div class="channel-container">
        <img src="" class="preview-image">
        <div class="channel-content">
          <img src="" class="logo-image">
          <p class="channel-status"></p>
        </div>
      </div>
    `;

    const previewSelector = document.querySelectorAll('.preview-image')[i];
    const logoSelector = document.querySelectorAll('.logo-image')[i];
    const channelStatusSelector = document.querySelectorAll('.channel-status')[i];

    previewSelector.src = previeImage;
    logoSelector.src = logoImage;
    channelStatusSelector.innerHTML = `
      ${channelSatus}<br><br>
      ${channelName} 
    `;
  }
}

GetTop20();
