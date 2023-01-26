import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link href="/">Full Example</Link>
        </li>
        <li>
          <a href="/custom">Customised Example</a>
        </li>
      </ul>
    </nav>
  );
}
