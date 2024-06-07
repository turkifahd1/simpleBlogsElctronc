async function fetchData() {
  try {
    const response = await fetch('https://node-js-simpleblog811.onrender.com/api');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    displayNews(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayNews(newsData) {
  const newsContainer = document.getElementById('news-container');
  newsData.forEach(item => {
    const newsItem = document.createElement('div');
    newsItem.classList.add('p-6', 'border-b', 'border-gray-200');
    newsItem.id = `news-item-${item.id}`;
    newsItem.innerHTML = `
      <h2 class="text-xl font-semibold mb-2 text-gray-800">${item.title}</h2>
      <p class="text-gray-700">${item.tobic}</p>
      <p class="text-gray-700 mt-2"> ${item.place} <span class="font-semibold text-gray-800">:موقع الخبر</span></p>
      <p class="text-gray-700"> ${item.createdAt.substring(0, 10)} <span class="font-semibold text-gray-800">:تاريخ الخبر</span></p>
      <div class="flex justify-center mt-4">
        <button onclick="showEditModal('${item.id}', '${item.title}', '${item.tobic}', '${item.place}')" class="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">تعديل</button>
        <button onclick="handleDelete('${item.id}')" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">حذف</button>
      </div>
    `;
    newsContainer.appendChild(newsItem);
  });
}

function showEditModal(id, title, tobic, place) {
  const modal = document.getElementById('edit-modal');
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
    <input type="hidden" id="news-id" value="${id}">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="news-title">عنوان الخبر</label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="news-title" type="text" value="${title}">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="news-tobic">موضوع الخبر</label>
      <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="news-tobic">${tobic}</textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="news-place">موقع الخبر</label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="news-place" type="text" value="${place}">
      </div>
    `;
    modal.classList.remove('hidden');
  }
  
  function closeModal() {
    const modal = document.getElementById('edit-modal');
    modal.classList.add('hidden');
  }
  
  async function handleSave() {
    const id = document.getElementById('news-id').value;
    const title = document.getElementById('news-title').value;
    const tobic = document.getElementById('news-tobic').value;
    const place = document.getElementById('news-place').value;
  
    try {
      const response = await fetch(`https://node-js-simpleblog811.onrender.com/api/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, tobic, place })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
  
      const newsItem = document.getElementById(`news-item-${id}`);
      newsItem.querySelector('h2').innerText = title;
      newsItem.querySelector('p:nth-of-type(1)').innerText = tobic;
      newsItem.querySelector('p:nth-of-type(2)').innerHTML = `${place} <span class="font-semibold text-gray-800">:موقع الخبر</span>`;
  
      closeModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }
  
  async function handleDelete(id) {
    try {
      const newsItem = document.getElementById(`news-item-${id}`);
      if (!newsItem) {
        throw new Error('Item not found');
      }
      newsItem.remove();
  
      const response = await fetch(`https://node-js-simpleblog811.onrender.com/api/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      } else {
        console.log('Data deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  
  fetchData();
  
