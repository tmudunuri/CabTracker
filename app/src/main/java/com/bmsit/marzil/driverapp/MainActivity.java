package com.bmsit.marzil.driverapp;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

public class MainActivity extends AppCompatActivity {

    Button login;
    EditText regno;
    EditText loginid;
    EditText loginpass;
    TextView text;
    private FirebaseAuth mAuth;


    private static final String PREFS_NAME = "preferences";
    private static final String PREF_UNAME = "Username";
    private static final String PREF_PASSWORD = "Password";
    private static final String PREF_REGNO="RegNo";

    private final String DefaultUnameValue = "";
    private String UnameValue;

    private final String DefaultPasswordValue = "";
    private String PasswordValue;

    private final String DefaultRegValue = "";
    private String RegValue;

    @Override
    public void onPause() {
        super.onPause();
        savePreferences();

    }

    @Override
    public void onResume() {
        super.onResume();
        loadPreferences();
    }


    private void savePreferences() {
        SharedPreferences settings = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = settings.edit();

        // Edit and commit
        UnameValue = loginid.getText().toString();
        PasswordValue = loginpass.getText().toString();
        RegValue=regno.getText().toString();
        System.out.println("onPause save name: " + UnameValue);
        System.out.println("onPause save password: " + PasswordValue);
        editor.putString(PREF_UNAME, UnameValue);
        editor.putString(PREF_PASSWORD, PasswordValue);
        editor.putString(PREF_REGNO,RegValue);
        editor.commit();
    }



    private void loadPreferences() {

        SharedPreferences settings = getSharedPreferences(PREFS_NAME,
                Context.MODE_PRIVATE);

        // Get value
        UnameValue = settings.getString(PREF_UNAME, DefaultUnameValue);
        PasswordValue = settings.getString(PREF_PASSWORD, DefaultPasswordValue);
        RegValue=settings.getString(PREF_REGNO,DefaultRegValue);
        loginid.setText(UnameValue);
        loginpass.setText(PasswordValue);
        regno.setText(RegValue);
        System.out.println("onResume load name: " + UnameValue);
        System.out.println("onResume load password: " + PasswordValue);
    }




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mAuth = FirebaseAuth.getInstance();
        // Check if user is signed in (non-null) and update UI accordingly.
        //FirebaseUser currentUser = mAuth.getCurrentUser();
        login = findViewById(R.id.login);
        regno=findViewById(R.id.regno);
        loginid=findViewById(R.id.loginid);
        loginpass=findViewById(R.id.loginpass);
        text=findViewById(R.id.text);



        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                if(!regno.getText().toString().matches(""))
                {
                    if(!loginid.getText().toString().matches("") && !loginpass.getText().toString().matches("")) {
                        mAuth.signInWithEmailAndPassword(loginid.getText().toString(),loginpass.getText().toString())
                                .addOnCompleteListener(MainActivity.this, new OnCompleteListener<AuthResult>() {
                                    @Override
                                    public void onComplete(@NonNull Task<AuthResult> task) {

                                        if (task.isSuccessful()) {
                                            Intent intent = new Intent(MainActivity.this, DriverMapActivity.class);
                                            intent.putExtra("regpass", regno.getText().toString());
                                            savePreferences();
                                            startActivity(intent);
                                        } else {
                                            Toast.makeText(getApplicationContext(), "Not Connected", Toast.LENGTH_LONG).show();
                                        }

                                    }
                                });
                    }
                    else
                        {
                            Toast.makeText(getApplicationContext(),"Please Enter ID and Password",Toast.LENGTH_LONG).show();
                        }

                }
                else
                {
                        Toast.makeText(getApplicationContext(),"Enter Registration Number",Toast.LENGTH_LONG).show();
                }


            }
        });
    }

}


