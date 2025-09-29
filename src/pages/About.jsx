const About = () => {
  return (
    <section>
      <div className="content">
        <h1 id="blog-api">Blog API</h1>
        <p>
          This is a project created for The Odin Project&#39;s Node.js course to
          build an{" "}
          <a href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api">
            API server
          </a>{" "}
          and two front-end websites to make requests to the API endpoints to
          view and manage blog posts, comments, and users.{" "}
        </p>
        <p>
          The server is built with Node.js and Express. I chose to write both
          front-end sites in React to get some more practice with the library,
          specifically in making calls to an API.
        </p>
        <h2 id="api-server">API Server</h2>
        <p>
          <strong>Repo:</strong>{" "}
          <a href="https://github.com/grntco/blog-api-server">
            https://github.com/grntco/blog-api-server
          </a>
        </p>
        <p>
          Building the API server was the focus of this project. The endpoints
          follow RESTful principles, with clear relationships between resources
          in the URL paths (i.e., <code>/posts/:postId/comments</code>) and
          correct HTTP methods for requested actions. All endpoints return
          standardized JSON objects.
        </p>
        <p>
          One of the main learning outcomes of this project was to use JSON Web
          Tokens (JWTs) for request authentication. So, when a user has a
          successful login, a JWT token is generated on the server and then sent
          back to the client, where it is stored in localStorage and applied to
          the header on certain user- and admin-only requests (like creating and
          modifying data), which require a JWT in order to provide a successful
          response. I used <code>passport</code>&#39;s JWT strategy to help
          implement this since I was already using <code>passport</code>&#39;s
          local strategy for user&#39;s account creation and logging in.
        </p>
        <p>
          For my PostgreSQL database, I used Prisma ORM to define model schema
          and retrieve/modify data. I had used Prisma on other projects before,
          but it was helpful to get more experience here on a bigger project,
          specifically in creating relationships between tables and querying
          them to retrieve related data (i.e., returning one object with the
          post data and comments associated with it).
        </p>
        <p>
          I also added rate limiting to requests with{" "}
          <code>express-rate-limit</code> to limit the amount of requests per IP
          and <code>express-validator</code> to validate requests&#39; body
          data.
        </p>
        <h3 id="tools-">Tools:</h3>
        <ul>
          <li>Prisma</li>
          <li>bcryptjs</li>
          <li>cors</li>
          <li>express</li>
          <li>express-rate-limit</li>
          <li>express-validator</li>
          <li>jsonwebtoken</li>
          <li>passport</li>
          <li>passport-jwt</li>
          <li>passport-local</li>
        </ul>
        <h2 id="user-blog">User Blog</h2>
        <p>
          <strong>Repo:</strong>{" "}
          <a href="https://github.com/grntco/blog-api-user-client">
            https://github.com/grntco/blog-api-user-client
          </a>
        </p>
        <p>
          <strong>Demo:</strong>{" "}
          <a href="https://blog-api-user-client.vercel.app/">
            https://blog-api-user-client.vercel.app/
          </a>
        </p>
        <p>
          This site is the public blog built in React. Any user can view the
          list of posts and a single post, but to leave a comment on any post
          they must first create an account and login.{" "}
        </p>
        <p>
          On the blog post list, pagination is done on the server by providing
          parameters to the request (i.e., <code>/posts?page=2</code>), and each
          page fetches the next set of results for that page. For displaying the
          posts, I used React Markdown to convert the post&#39;s content
          formatted in markdown to HTML. For making requests, I defined custom
          hooks called <code>useFetch</code> and <code>useMutation</code> to
          retrieve and modify data.
        </p>
        <p>
          For demo purposes, I used ChatGPT to generate the posts&#39; content.
        </p>
        <h3 id="features-">Features:</h3>
        <ul>
          <li>View a list of posts sorted by most recent. </li>
          <li>Create an account and login to leave a comment on a post.</li>
        </ul>
        <h3 id="tools-">Tools:</h3>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>React Markdown</li>
        </ul>
        <h2 id="admin-dashboard">Admin Dashboard</h2>
        <p>
          <strong>Repo:</strong>{" "}
          <a href="https://github.com/grntco/blog-api-admin-client">
            https://github.com/grntco/blog-api-admin-client
          </a>
        </p>
        <p>
          <strong>Demo:</strong>{" "}
          <a href="https://blog-api-admin-client.vercel.app/">
            https://blog-api-admin-client.vercel.app/
          </a>
        </p>
        <p>
          I also used React to create this Admin Dashboard. Only admin users are
          able to view the pages on this website for managing the posts,
          comments, and users.{" "}
        </p>
        <p>
          The page tables are set up similarly to the post list on the User Blog
          with pagination handled by request parameters. Also, admins can search
          table results, which is similarly handled by a <code>?search=</code>{" "}
          parameter on the API requests.{" "}
        </p>
        <h3 id="features-">Features:</h3>
        <ul>
          <li>
            Login with these credentials:{" "}
            <ul>
              <li>
                <code>Email: adminuser@example.com</code>
              </li>
              <li>
                <code>Password: Password2@</code>
              </li>
            </ul>
          </li>
          <li>View tables for the posts, comments, and users.</li>
          <li>On the Posts page, you can filter by published posts.</li>
          <li>
            Add a new post, give it a title and write your content, which
            supports markdown formatting.
          </li>
          <li>
            Edit a post to publish it or set it as a draft, causing it to show
            up or not show up on the User Blog site.
          </li>
          <li>Edit a user to make them an admin.</li>
          <li>Delete comments.</li>
        </ul>
        <h3 id="tools-">Tools:</h3>
        <ul>
          <li>React</li>
          <li>React Router</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
