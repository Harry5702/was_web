export const site = {
  name: "WAS Sportswear",
  tagline: "We Are Stubborn",
  email: "wasindustry0@gmail.com",
  phones: [
    { display: "+92 312 7536091", raw: "923127536091" },
    { display: "+92 339 7070787", raw: "923397070787" },
  ],
  location: "Sialkot, Pakistan",
};

export function whatsappLink(message: string, phoneIndex = 0) {
  return `https://wa.me/${site.phones[phoneIndex].raw}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
