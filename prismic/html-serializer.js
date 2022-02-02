import PrismicDOM from 'prismic-dom'
const Elements = PrismicDOM.RichText.Elements

export default function (type, element, content, children) {
  switch (type) {
    case Elements.heading1:
      return `
      <h1 class="text-[3rem] mb-2 leading-[57px]">${children.join('')}</h1>
      `
    case Elements.heading2:
      return `
      <h2 class="text-[1.5rem] mb-5 leading-[38px]">${children.join('')}</h2>
      `
    case Elements.heading3:
      return `
      <h3 class="text-[1rem] font-bold mb-2 leading-[25px]">
        ${children.join('')}
      </h3>
      `
    case Elements.heading4:
      return `
      <h4 class="text-[1.5rem] font-medium mb-2 leading-[28px]">
        ${children.join('')}
      </h4>
      `
    case Elements.paragraph:
      return `<p class="text-[18px] mb-4 break-words">${children.join('')}</p>`
    case Elements.strong:
      return `<strong>${children.join('')}</strong>`
    case Elements.hyperlink:
      return `
      <a
        href=${element.data.url}
        data-nuxt-link class="text-[#007bff] hover:text-[#0056b3] break-words hover:underline"
      >
        ${children.join('')}
      </a>
      `
    case Elements.oList:
      return `
      <ol class="my-4 pl-10 text-[18px] leading-[27px] list-decimal">
        ${children.join('')}
      </ol>
      `
    case Elements.list:
      return `
      <ul class="my-4 pl-10 text-[18px] leading-[27px] list-disc">
        ${children.join('')}
      </ul>
      `
    case Elements.preformatted:
      return element.text
    default:
      return null
  }
}
