# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


guest = User.create(email: "guest@hireme.com", password: "password")

cooking = guest.dashboards.create(title: "Recipes and Cooking")
fitness = guest.dashboards.create(title: "Fitness")
me = guest.dashboards.create(title: "Totally Hireable People")

dinner_nb = cooking.notebooks.create(title: "Dinner Ideas")
cook_cheat_nb = cooking.notebooks.create(title: "Cheatsheets")

tabata_nb = fitness.notebooks.create(title: "Tabata FTW")
running_nb = fitness.notebooks.create(title: "Running")
biking_nb = fitness.notebooks.create(title: "Biking")

course_nb = me.notebooks.create(title: "Courses Taken")
random_nb = me.notebooks.create(title: "Random Facts")

dinner_nb.notes.create(title: "Ravioli With Sage-Walnut Butter",
body: "Ingredients
Kosher salt
1/4 cup balsamic vinegar
2 teaspoons honey
1 bay leaf
2 9 -ounce packages refrigerated cheese ravioli
6 tablespoons unsalted butter
1/3 cup fresh sage leaves
1 cup walnuts, roughly chopped
3/4 cup grated parmesan cheese

Directions
Bring a large pot of salted water to a boil. Combine the vinegar, honey and bay leaf in a small saucepan and boil over medium-high heat until syrupy, 4 to 5 minutes. Cover to keep warm.

Add the ravioli to the boiling water and cook as the label directs. Meanwhile, melt the butter in a large skillet over medium heat, then add the sage and walnuts and cook until the nuts are toasted, about 3 minutes. Increase the heat to high, ladle in about 1 cup cooking water and bring to a boil. Cook until reduced by about half, 1 to 2 minutes.

Drain the ravioli, reserving another 1/2 cup cooking water. Add the ravioli to the skillet and toss to coat, adding the reserved water as needed. Remove from the heat, toss with the parmesan and season with salt. Divide the ravioli among plates and drizzle with the balsamic syrup.

Per serving: Calories 613; Fat 47 g (Saturated 19 g); Cholesterol 94 mg; Sodium 633 mg; Carbohydrate 29 g; Fiber 4 g; Protein 17g"
)

dinner_nb.notes.create(title: "Cold Peanut Soba Noodles With Chicken",
body: "Ingredients
12 ounces soba ( buckwheat) noodles
1 cup frozen shelled edamame
1/2 cup peanut butter
2 tablespoons rice vinegar (not seasoned)
1 tablespoon soy sauce
2 teaspoons grated peeled ginger
1 teaspoon sesame oil
1 teaspoon Asian chili sauce (such as Sriracha or sambal oelek)
Kosher salt
1 cup shredded rotisserie chicken

Directions
Bring a large pot of water to a boil. Add the soba noodles and edamame and cook as the noodle label directs. Reserve 1 cup cooking water, then drain the noodles and edamame and run under cold water until cool.

Whisk the peanut butter, vinegar, soy sauce, ginger, sesame oil and chili sauce in a large bowl. Add 1/2 cup of the reserved cooking water and whisk until smooth. Add the noodles and edamame, season with salt and toss to combine (add more cooking water to loosen, if needed). Divide among shallow bowls and top with the chicken, cucumber and scallions.

Per serving: Calories 652; Fat 25 g (Saturated 5 g); Cholesterol 57 mg; Sodium 1,446 mg; Carbohydrate 78 g; Fiber 5 g; Protein 38 g"
)

cook_cheat_nb.notes.create(title: "Small Measurements",
body: "1 tablespoon = 3 teaspoons = 1/2 fluid ounce

1/4 cup = 4 tablespoons = 2 fluid ounces

1/3 cup = 5 tablespoons + 1 teaspoon = 3 fluid ounces

1/2 cup = 8 tablespoons = 4 fluid ounces

1 cup = 16 tablespoons = 1/2 pint = 8 fluid ounces"
)

tabata_nb.notes.create(title: "General Info",
body: "Tabata regimen
A version of HIIT was based on a 1996 study by Professor Izumi Tabata et al. initially involving Olympic speedskaters, uses 20 seconds of ultra-intense exercise (at an intensity of about 170% of VO2max) followed by 10 seconds of rest, repeated continuously for 4 minutes (8 cycles). The exercise was performed on a mechanically braked cycle ergometer. Tabata called this the IE1 protocol. In the original study, athletes using this method trained 4 times per week, plus another day of steady-state training, and obtained gains similar to a group of athletes who did steady state training (70% VO2max) 5 times per week. The steady state group had a higher VO2max at the end (from 52 to 57 mL/(kg min), but the Tabata group had started lower and gained more overall (from 48 to 55 mL/(kg min). Also, only the Tabata group had gained anaerobic capacity benefits."
)

tabata_nb.notes.create(title: "This will destroy you",
body: "8 times on each exercise before moving to the next.  (est time <20 mins)
20 seconds fast and precise (don't get sloppy and hurt yourself), 10 second break.
Record number of reps per each 20 seconds of work.

  Body Weight Squats
  Push Ups
  Sit Ups
  Pull Ups (cheat if you can't do pull ups without assisstance)

Score: add the lowest scores for each exercise type.  Aim to beat this next time."
)

running_nb.notes.create(title: "I like running", body: "yup, sure do.")
biking_nb.notes.create(title: "Bike Commuting", body: "So much faster than the MUNI")

course_nb.notes.create(title: "CS-169.1x Software as a Service",
body: "About this Course

CS169.1x teaches the fundamentals for engineering long-lasting software using highly-productive Agile techniques to develop Software as a Service (SaaS) using Ruby on Rails. Students will understand the new challenges and opportunities of SaaS versus shrink-wrapped software. They will understand and apply fundamental programming techniques to the design, development, testing, and public cloud deployment of a simple SaaS application. Students will use best-of-breed tools that support modern development techniques including behavior-driven design, user stories, test-driven development, velocity, and pair programming. Students will learn how modern programming language features like metaprogramming and reflection can improve productivity and code maintainability. Students will work on weekly coding projects and quizzes. Those who successfully complete the assignments and earn a passing grade can get an honor code certificate or verified certificate from BerkeleyX. The videos and homeworks used in this offering of the course were revised in October 2013. The new class also includes embedded live chat with Teaching Assistants and other students and opportunities for remote pair programming with other students. Group tutorial Q&A sessions will also be held and broadcast live through Google Hangouts and YouTube."
)

course_nb.notes.create(title: "6.00x: Introduction to Computer Science and Programming",
body: "About this Course

Introduction to Computer Science and Programming Using Python covers the notion of computation, the Python programming language, some simple algorithms, testing and debugging, and informal introduction to algorithmic complexity, and some simple algorithms and data structures."
)

course_nb.notes.create(title: "Algorithms: Design and Analysis, Part 1",
body: "About the Course

In this course you will learn several fundamental principles of algorithm design. You'll learn the divide-and-conquer design paradigm, with applications to fast sorting, searching, and multiplication. You'll learn several blazingly fast primitives for computing on graphs, such as how to compute connectivity information and shortest paths. Finally, we'll study how allowing the computer to flip coins can lead to elegant and practical algorithms and data structures. Learn the answers to questions such as: How do data structures like heaps, hash tables, bloom filters, and balanced search trees actually work, anyway? How come QuickSort runs so fast? What can graph algorithms tell us about the structure of the Web and social networks? Did my 3rd-grade teacher explain only a suboptimal algorithm for multiplying two numbers?"
)

course_nb.notes.create(title: "Programming Languages",
body: "About the Course
Learn many of the concepts that underlie all programming languages. Develop a programming style known as functional programming and contrast it with object-oriented programming. Through experience writing programs and studying three different languages, learn the key issues in designing and using programming languages, such as modularity and the complementary benefits of static and dynamic typing. This course is neither particularly theoretical nor just about programming specifics, it will give you a framework for understanding how to use language constructs effectively and how to design correct and elegant programs. By using different languages, you learn to think more deeply than in terms of the particular syntax of one language. The emphasis on functional programming is essential for learning how to write robust, reusable, composable, and elegant programs in any language."
)

course_nb.notes.create(title: "Functional Programming Principles in Scala",
body: "About the Course
This course introduces the cornerstones of functional programming using the Scala programming language. Functional programming has become more and more popular in recent years because it promotes code that's safe, concise, and elegant. Furthermore, functional programming makes it easier to write parallel code for today's and tomorrow's multiprocessors by replacing mutable variables and loops with powerful ways to define and compose functions.

Scala is a language that fuses functional and object-oriented programming in a practical package. It interoperates seamlessly with Java and its tools. Scala is now used in a rapidly increasing number of open source projects and companies. It provides the core infrastructure for sites such as Twitter, LinkedIn, Foursquare, Tumblr, and Klout.

In this course you will discover the elements of the functional programming style and learn how to apply them usefully in your daily programming tasks. You will also develop a solid foundation for reasoning about functional programs, by touching upon proofs of invariants and the tracing of execution symbolically.

The course is hands on; most units introduce short programs that serve as illustrations of important concepts and invite you to play with them, modifying and improving them. The course is complemented by a series of assignments, most of which are also programming projects."
)

random_nb.notes.create(title: "Jon Skrip", body: "He's pretty cool.  You should hire him.")







