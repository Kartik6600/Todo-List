import "./css/Footer.css";

export default function Footer() {
  let year = new Date().getFullYear();
  return (
    <div class="a">
      <p>Copyright &copy; {year} Todo List</p>
    </div>
  );
}
