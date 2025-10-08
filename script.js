$(document).ready(function () {
  /*
   * Main variables
   */
  const content = [
    {
      title: "I Have Crush On You!!",
      desc: "",
    },
    {
      title: "I Have Crush On You!!",
      desc: [
        "Mungkin itu sebuah kalimat yg cukup simple, kalimat yang menyimpan banyak harapan dan juga keraguan dibaliknya.",
        "Ada harapan yg ingin rasa suka itu tidak jatuh sendirian, juga ada mental yg disiapkan agar bisa menerima resiko menyukai seseorang.",
      ],
    },
    {
      title: "",
      desc: [
        "Menurut aku, menyatakan perasaan itu hal yg cukup serius, banyak yg akan dikorbankan termasuk hasil akhirnya, tapi juga melepas hal yg sudah Iama tersimpan itu cukup melegakan dan bukan hal yg mudah.",
        "Sebenarnya aku gak hebat masalah ungkapin perasaan tapi disini aku cuman mau ungkapin perasaan aku sama kamu, masalah diterima atau gak itu hak kamu, aku juga gak bakal berharap lebih sama kamu",
      ],
    },
    {
      title: "",
      desc: [
        "Kalau kamu selama ini risih langsung bilang yaa gak usah dipendam lagi atau takut nyakitin perasaan aku, semisal kamu udah punya crush atau dekatan maaf yaa karna udah confess ke kamu...",
        "Mungkin segini saja dari aku, senang bisa kenal dan cerita sama kamu. Hehe makasih yaa sudah mau dibaca.",
      ],
    },
    {
      title: "I Have Crush On You!!",
      desc: "Aku Tunggu Balasan Kamu:)",
    },
  ];

  let currentPage = 0;

  // Fungsi untuk menambahkan kelas khusus pada penanda jeda
  function setText(contentIndex) {
    let j;

    for (j = 0; j < content[contentIndex].title.length; j++) {
      $(".soup-title")
        .last()
        .append(
          '<span class="letter">' + content[contentIndex].title[j] + "</span>"
        );
    }

    for (j = 0; j < content[contentIndex].desc.length; j++) {
      let character = content[contentIndex].desc[j];

      let classAttr =
        character === "_"
          ? ' class="letter line-break-spacer"'
          : ' class="letter"';

      $(".soup-desc")
        .last()
        .append("<span" + classAttr + ">" + character + "</span>");
    }
  }

  // Loop Inisialisasi Konten
  for (let i = 0; i < content.length; i++) {
    for (let obj in content[i]) {
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      } else if (typeof content[i][obj] === "object") {
        let toPush = [];

        for (let j = 0; j < content[i][obj].length; j++) {
          if (j > 0) {
            for (let p = 0; p < 1; p++) {
              toPush.push("_");
            }
          }
          for (let k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }

    $("#segments").append(
      '<div class="letters-wrap mutable"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText(i);

    $("#segments").append(
      '<div class="letters-wrap position-data"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText(i);
  }

  arrangeCurrentPage();
  scrambleOthers();

  /*
   * Event handlers
   */
  $(window).resize(function () {
    arrangeCurrentPage();
    scrambleOthers();
  });

  $("#soup-prev").hide();

  $("#soup-prev").click(function () {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });

  $("#soup-next").click(function () {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });

  /*
   * Functions
   */
  function arrangeCurrentPage() {
    for (let i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001,
        });
    }
    for (let i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001,
        });
    }
  }

  function scrambleOthers() {
    for (let i = 0; i < content.length; i++) {
      if (currentPage === i) continue;

      const parts = [
        ["title", ".soup-title"],
        ["desc", ".soup-desc"],
      ];

      for (let j = 0; j < parts.length; j++) {
        for (let k = 0; k < content[i][parts[j][0]].length; k++) {
          const randLeft = Math.floor(Math.random() * $(window).width());
          const randTop = Math.floor(Math.random() * $(window).height());

          const offset = $(".position-data").eq(currentPage).offset();
          const bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top,
          };
          const middleX =
            bounds.left + $(".position-data").eq(currentPage).width() / 2;
          const middleY =
            bounds.top + $(".position-data").eq(currentPage).height() / 2;

          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter")
            .eq(k)
            .css({
              left: randLeft,
              top: randTop,
              color: "#DDD",
              zIndex: "initial",
            });
        }
      }
    }
  }
});
