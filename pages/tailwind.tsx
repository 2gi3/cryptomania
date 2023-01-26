import React from "react";

function Tailwind() {
  return (
    <div>
      <div>
        <nav>
          <div>
            <h1 className="text-3xl underline">
              <a href="/">TEST Food Ninja TTT</a>
            </h1>
          </div>
          <ul>
            <li>
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>About</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Contact</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <main>
        <div>
          <a href="#">Log in</a>
          <a href="#">Sign up</a>
        </div>

        <header>
          <h2>Recipes</h2>
          <h3>For Ninjas</h3>
        </header>

        <div>
          <h4>Latest Recipes</h4>

          <div>
            {/* <!-- cards go here --> */}
            <div>
              <img src="/img/stew.jpg" alt="stew" />
              <div>
                <span>5 Bean Chili Stew</span>
                <span>Recipe by Mario</span>
              </div>
            </div>
          </div>

          <h4>Most Popular</h4>

          <div>{/* <!-- cards go here --> */}</div>
        </div>

        <div>
          <div>Load more</div>
        </div>
      </main>
    </div>
  );
}

export default Tailwind;
