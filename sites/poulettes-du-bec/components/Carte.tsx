import { carte } from "@/content";
import { CalendarIcon, Icon } from "./icons";

export default function Carte() {
  return (
    <section className="section carte" id="carte">
      <div className="wrap" style={{ position: "relative" }}>
        <div className="carte__head reveal">
          <span className="eyebrow">{carte.eyebrow}</span>
          <h2 className="section-title">{carte.title}</h2>
          <p className="lead">{carte.lead}</p>
        </div>

        <div className="carte__cats">
          {carte.categories.map((c) => (
            <div key={c.cat} className={"menu-cat reveal" + (c.wide ? " menu-cat--wide" : "")}>
              <h3 className="menu-cat__title"><Icon name={c.icon} size={20} /> {c.cat}</h3>
              <div className="menu-list">
                {c.items.map((it, i) => (
                  <div className="menu-item" key={i}>
                    <span className="menu-item__name">{it.name}</span>
                    <span className="menu-item__price">{it.price}</span>
                    <span className="menu-item__desc">{it.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="carte__note reveal">
          <span className="menu-around">{carte.note.around}</span>
          <p>{carte.note.text}</p>
          <a href="#reserver" className="btn btn--primary">
            <CalendarIcon size={20} /> Réserver une table
          </a>
        </div>
      </div>
    </section>
  );
}
