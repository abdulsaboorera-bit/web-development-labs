export default function Home() {
  return (
    <>
      <div className="topbar">Get Free Shipping on orders above 1999/-</div>

      <div className="logo">
        <img src="/images/darimuch.png.png" alt="Not Found" width="13%" />
        <i className="fa-solid fa-bars" id="fa-bars"></i>
        <i className="fa-solid fa-xmark" id="fa-xmark"></i>
      </div>

      <nav>
        <ul>
          <li>Categories</li>
          <li>Ramadan Bundle</li>
          <li>Beard</li>
          <li>Face</li>
          <li>Hair</li>
          <li>De-Tan Line</li>
          <li>build your Own Bundle</li>
          <li>Royality Rewards</li>
          <li>Dari Mooch Barber Shop</li>
          <li>Best Sellers</li>
          <li>Deals</li>
        </ul>
        <ul>
          <li>Best Sellers</li>
          <li>Deals</li>
          <li>Gifts</li>
          <li>All Products</li>
          <li>Blog</li>
          <li>Order Tracker</li>
        </ul>
      </nav>

      <div className="header_img">
        <img src="/images/header.png" alt="Not Found" width="100%" height="auto" />
      </div>

      <section className="carousel-section">
        <div className="carousel-controls">
          <button type="button" className="carousel-btn" id="carousel-prev">
            Previous
          </button>
          <p className="slide-counter" id="slide-counter">
            Showing 1 of 6
          </p>
          <button type="button" className="carousel-btn" id="carousel-next">
            Next
          </button>
        </div>

        <div className="owl-carousel" id="product-carousel">
          <div className="carousel-card" data-target="best-sellers-section">
            <img src="/images/C1.png" alt="De-Tan Products" />
          </div>
          <div className="carousel-card" data-target="face-products-section">
            <img src="/images/c2.png" alt="Charcoal Products" />
          </div>
          <div className="carousel-card" data-target="beard-section">
            <img src="/images/c3.png" alt="Beard Products" />
          </div>
          <div className="carousel-card" data-target="body-section">
            <img src="/images/c4.png" alt="Body Products" />
          </div>
          <div className="carousel-card" data-target="hair-products-section">
            <img src="/images/c5.png" alt="Hair Products" />
          </div>
          <div className="carousel-card" data-target="body-section">
            <img src="/images/c6.png" alt="Glow Line Products" />
          </div>
        </div>
      </section>

      <div className="launch-container">
        <h1>New Launch</h1>

        <div className="launch-products">
          <div className="launch-item">
            <img src="/images/nl1.png" alt="New Launch Product 1" />
            <p>Rs:1,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐✨</p>
          </div>

          <div className="launch-item">
            <img src="/images/nl2.png" alt="New Launch Product 2" />
            <p>Rs:2,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐✨</p>
          </div>
        </div>
      </div>

      <div className="products-container" id="best-sellers-section">
        <h1 className="products-heading">Best Selling Products</h1>
        <div className="products-grid">
          <div className="item">
            <img src="/images/bs1.png" alt="Not Found" />
            <p>Glow Facewash</p>
            <p>price: Rs. 1,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/bs2.png" alt="Not Found" />
            <p>Glow Body Wash</p>
            <p>price: Rs. 2,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/bs3.png" alt="Not Found" />
            <p>Glow Bundle</p>
            <p>price: Rs. 3,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/bs4.png" alt="Not Found" />
            <p>Sunge Perfume</p>
            <p>price: Rs. 4,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <div className="products-container" id="face-products-section">
        <h1 className="products-heading">Face</h1>

        <div className="products-grid">
          <div className="item">
            <img src="/images/fp1.png" alt="Not Found" />
            <p>De-Tan Sunscreen</p>
            <p>price: Rs. 1,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/fp2.png" alt="Not Found" />
            <p>Lib Lightener Balm</p>
            <p>price: Rs. 2,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/fp3.png" alt="Not Found" />
            <p>Lib-Balm</p>
            <p>price: Rs. 3,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/fp4.png" alt="Not Found" />
            <p>Under Eye Balm</p>
            <p>price: Rs. 4,999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <div className="products-container">
        <h1 className="products-heading" id="hair-products-section">
          Hair
        </h1>

        <div className="products-grid">
          <div className="item">
            <img src="/images/h1.png" alt="Hair Care Image" />
            <p>Hair Hold Cream</p>
            <p>RS: 1099.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/h2.png" alt="Hair Care Image" />
            <p>Anti-Hairfall Bundle | Complete Hair Loss Solution</p>
            <p>RS: 1978.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/h3.png" alt="Hair Care Image" />
            <p>Ultimate Skin and Hair Care Bundle</p>
            <p>RS: 2499.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/h4.png" alt="Hair Care Image" />
            <p>Anti-Hairfall Shampoo</p>
            <p>RS: 1099.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <div className="products-container" id="beard-section">
        <h1 className="products-heading">Beard Products</h1>

        <div className="products-grid">
          <div className="item">
            <img src="/images/b1.png" alt=" Not Found" />
            <p>Beard Growth Kit</p>
            <p>RS: 3799.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/b2.png" alt=" Not Found" />
            <p>Beard Growth Oil</p>
            <p>RS: 1499.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/b3.png" alt=" Not Found" />
            <p>Beard Growth Biotin Spray</p>
            <p>RS: 1499.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/b4.png" alt=" Not Found" />
            <p>Beard Growth Shampoo</p>
            <p>RS: 1099.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <div className="products-container" id="body-section">
        <h1 className="products-heading">Body</h1>
        <div className="products-grid">
          <div className="item">
            <img src="/images/body1.png" alt=" Not Found" />
            <p>Surge Perfume</p>
            <p>RS: 2999.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/body2.png" alt=" Not Found" />
            <p>Glow Body Wash</p>
            <p>RS: 799.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/body3.png" alt=" Not Found" />
            <p>Charcoal Body Wash</p>
            <p>RS: 699.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>

          <div className="item">
            <img src="/images/body4.png" alt=" Not Found" />
            <p>De-Tan Body Wash (300ml)</p>
            <p>RS: 899.00</p>
            <button className="add-cart-btn">Add To Cart</button>
            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </div>
      </div>

      <div className="endingimg">
        <img src="/images//lastimg.png" alt="Not Found" />
      </div>

      <div id="newsletter">
        <h1>Newsletter</h1>
        <p>
          Let your customers know what to expect if they sign up to your mailing
        </p>
        <p>A discount code or the latest news from your brand.</p>
        <div>
          <input type="text" placeholder="Email@example" id="news-input" />
          <button>Subscribe</button>
        </div>
      </div>

      <hr />

      <footer>
        <div className="footer-container">
          <div>
            <li>Categories</li>
            <li>Ramdan Bundles</li>
            <li>Hair</li>
            <li>Face</li>
            <li>Beard</li>
            <li>De-Tan Line</li>
            <li>Build Your Own Bundle</li>
            <li>Loyalty Rewards</li>
            <li>Dari Mooch Barber Shop</li>
            <li>Best Sellers</li>
            <li>Deals</li>
            <li>Gifts</li>
            <li>All Products</li>
            <li>Blog</li>
            <li>Order Tracker</li>
          </div>

          <div>
            <li>Track Your Order</li>
            <li>Search</li>
            <li>About us</li>
            <li>Be Our Distributor</li>
            <li>FAQ</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>Terms of Service</li>
            <li>Other Stores</li>
          </div>

          <div>
            <strong>MINI BIO</strong>
            <p>
              Dari Mooch is a one stop solution for all your grooming needs. We’re
              the best at what we do and we leave no man behind. We&#39;re on a
              mission to style and groom every Pakistani man to their best self!
            </p>

            <strong>STORE LOCATIONS:</strong>

            <li>• Shapes Executive Gym Gulberg-lll, Lahore</li>
            <li>• Lake City Mall 1st floor, Lahore</li>
            <li>• Packages Mall 2nd Floor Opposite Outfitters, Lahore</li>
            <li>• Ground Floor Dari Mooch Kiosk Opposite Cougar Giga Mall Islamabad</li>
            <li>• Barber Shop: Plaza # 30C, DHA Phase 4 Sector CCA DHA, Lahore</li>
          </div>

          <div>
            <strong>Contact</strong>
            <p>support@darimooch.com</p>

            <strong>+92 316 1115556</strong>

            <div className="social-icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <hr />

        <div className="lastline">
          <p>Powered By Shopify</p>
          <p>© 2024 Dari Mooch.</p>
        </div>
      </footer>
    </>
  );
}
