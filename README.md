enableAuth: false

 k logs -n phoenix phoenix-5c9bb496f9-bkpfz -f
Traceback (most recent call last):
  File "<frozen runpy>", line 198, in _run_module_as_main
  File "<frozen runpy>", line 88, in _run_code
  File "/phoenix/.venv/lib/python3.13/site-packages/phoenix/server/main.py", line 429, in <module>
    main()
    ~~~~^^
  File "/phoenix/.venv/lib/python3.13/site-packages/phoenix/server/main.py", line 272, in main
    auth_settings = get_env_auth_settings()
  File "/phoenix/.venv/lib/python3.13/site-packages/phoenix/config.py", line 1190, in get_env_auth_settings
    phoenix_secret = get_env_phoenix_secret()
  File "/phoenix/.venv/lib/python3.13/site-packages/phoenix/config.py", line 1128, in get_env_phoenix_secret
    REQUIREMENTS_FOR_PHOENIX_SECRET.validate(phoenix_secret, "Phoenix secret")
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/phoenix/.venv/lib/python3.13/site-packages/phoenix/auth.py", line 272, in validate
    raise ValueError(err_text)
ValueError: Phoenix secret at least one digit
