import assets from "../assets"

export default () => (
  <>
    <h1>About MiniguePT and its creation</h1>
    <img src={assets.minigue} alt="" />
    <section>
      <h2>Model</h2>
      <p>
        MiniguePT is a fine-tuned Response Generation Model with Microsofts
        “DialoGPT” as the base. The small version was used due to limitations in
        the hardware of the authors. The dataset is made up of &gt; 200.000
        Telegram chat messages of the author cut down to 80.000 usable messages
        of pure text with available context. Messages containing pictures, links
        or audio files were excluded. Using PyTorch, DialoGPT was then
        fine-tuned for two epochs and evaluated on a small test set, with a
        resulting perplexity of 8.4. <br />
        For the exact parameters used to train the model visit the&nbsp;
        <a href="https://github.com/Eeeeelias/miniguept-chat">GitHub page</a>
        &nbsp;with the source code.
      </p>
    </section>
    <section>
      <h2>Limitations</h2>
      <p>
        Even after cutting down the dataset to usable text there are still major
        limitations that are reflected in the performance of the chatbot. The
        main problem being that the context given to the model may often not
        give the true context. Often times, there were links being exchanged
        that contain important context to the conversation at hand. This could
        not be included in the dataset. Using placeholders for these messages
        would result in the model replying with these placeholders when it feels
        it’s appropriate which would case more problems.
      </p>
      <p>
        This directly implies the next limitation: random answers. Sometimes the
        model seems to give completely unrelated replies to what was being said
        before. This is probably due to the context being incorrect in the
        dataset with the actual chat having images or links in between.
      </p>
      <p>
        Lastly, like other chatbots, this one, too, is very susceptible to
        suggestive text. It is rather simple to nudge the chatbot into the
        direction the user wants to go. This risks users exploiting the chatbot
        to agree with what they have in mind.
      </p>
    </section>
    <section>
      <h2>Bias</h2>
      <p>
        MiniguePT can not and does not represent the thoughts and views of the
        authors. Any explicit language, radical views or otherwise disturbing
        texts presented to the user are an artefact of randomly woven together
        text without appropriate context.
      </p>
    </section>
  </>
)
