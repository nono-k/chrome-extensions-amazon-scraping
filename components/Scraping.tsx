import { useState, useEffect } from "react";

export default function Scraping() {
  const defaultTemplate = `<AmazonLink\n  imageId=\"${"${imageURL}"}\"\n  linkId=""\n  title=\"${"${title}"}\"\n  author=\"${"${author}"}\"\n/>`;

  const [template, setTemplate] = useState(defaultTemplate);
  const [filledTemplate, setFilledTemplate] = useState('');
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    const savedTemplate = localStorage.getItem('amazonTemplate');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);

  const handleTemplateChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newTemplate = e.target.value;
    setTemplate(newTemplate);
    localStorage.setItem('amazonTemplate', newTemplate);
  }

  const fetchProductData = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { action: 'getAmazonData' }, (response) => {
        if (!response) {
          console.error('No response received from content script');
          return;
        }
        setFilledTemplate(
          template
            .replace("${title}", response.title || '')
            .replace("${author}", response.author || '')
            .replace("${imageURL}", response.imageUrl || '')
        );
      });
    })
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(filledTemplate);
    setIsCopying(true);
  }

  return (
    <div className="p-4 pt-2 w-72 bg-[#232E3E] text-white">
      <h2 className="text-base font-bold">Amazon 商品情報取得</h2>
      <textarea
        className="w-full p-2 border rounded mt-3"
        rows={6}
        value={template}
        onChange={handleTemplateChange}
      />
      <button onClick={fetchProductData} className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-1">
        商品情報を取得
      </button>

      {filledTemplate && (
        <>
          <pre className="mt-3 p-2 border rounded overflow-auto">{filledTemplate}</pre>
          <button onClick={copyToClipboard} className="mt-2 p-2 bg-orange-400 rounded w-full font-bold">
            コピー
          </button>
        </>
      )}

      {isCopying && (
        <div className="mt-2 text-center">
          コピーしました！
        </div>
      )}
    </div>
  )
}