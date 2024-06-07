document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('news-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    try {
      const response = await fetch('https://node-js-simpleblog811.onrender.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });
      if (!response.ok) {
        throw new Error('Failed to submit data');
      }
      // تم إرسال البيانات بنجاح
      alert('تم إرسال البيانات بنجاح!');
      // إعادة تعيين الحالة لتفريغ النموذج
      form.reset();
    } catch (error) {
      console.error('Error submitting data:', error);
      // فشل في إرسال البيانات
      alert('حدثت مشكلة أثناء إرسال البيانات. يرجى المحاولة مرة أخرى!');
    }
  });
});
