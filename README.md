FROM mirror-repository.net/platform/notebook/aipbase/cpu:jammy-24.06 as requirements-stage

WORKDIR /tmp

RUN conda install -y python=3.10 poetry=1.8.5

COPY ./pyproject.toml ./poetry.lock* /tmp/
RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

### main stage ###
FROM mirror-repository.net/platform/notebook/aipbase/cpu:jammy-24.06

WORKDIR /code/

COPY --from=requirements-stage /tmp/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY app /code/app

SHELL ["conda", "run", "-n", "aipbase", "/bin/bash", "-c"]

EXPOSE 8000
ENTRYPOINT ["conda", "run", "--no-capture-output", "-n", "aipbase", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
