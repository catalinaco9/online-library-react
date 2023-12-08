rafce -> for the functional arrow function

props: se creeaza automat cand sunt folosite

?? -> in caz ca nu este definita o valoare, sa aiba una default
color: definita ?? default

in state punem date despre un obiect, o variabila care daca se modifica, aplicatia se reincarca

const [products, setProducts] = useState(null);

prima data cand le setez, este cand le incarc -> pt a incarca este nevoie de useEffect (apare un side effect cand se intampla ceva, adica un side effect cand se incarca pagina)

!!call-urile catre backend sunt async !!
