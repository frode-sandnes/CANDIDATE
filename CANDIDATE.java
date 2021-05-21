package candidate;

/**
 *
 * @author Frode Eika Sandnes
 */

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import java.util.zip.CRC32;


public class CANDIDATE
    {
    // global variable for experimentation to reduce repeated computation
    public List<String> salts;  

    // Soundex encoder.
    public String soundex(String s) 
        {
        if (s == null || s.length() == 0)
            {
            return "";
            }
        char[] x = s.toUpperCase().toCharArray();
        char firstLetter = x[0];
        for (int i = 0; i < x.length; i++) 
            {
            switch (x[i]) 
                {
                case 'B':
                case 'F':
                case 'P':
                case 'V': 
                    {
                    x[i] = '1';
                    break;
                    }
                case 'C':
                case 'G':
                case 'J':
                case 'K':
                case 'Q':
                case 'S':
                case 'X':
                case 'Z': 
                    {
                    x[i] = '2';
                    break;
                    }
                case 'D':
                case 'T': 
                    {
                    x[i] = '3';
                    break;
                    }
                case 'L': 
                    {
                    x[i] = '4';
                    break;
                    }
                case 'M':
                case 'N': 
                    {
                    x[i] = '5';
                    break;
                    }
                case 'R': 
                    {
                    x[i] = '6';
                    break;
                    }
                default: 
                    {
                    x[i] = '0';
                    break;
                    }
                }
            }
        String output = "" + firstLetter;
        for (int i = 1; i < x.length; i++)
            {
            if (x[i] != x[i - 1] && x[i] != '0')
                {
                output += x[i];
                }
            }
        return output;
        }
   

    
    // Santitize the name and sort parts alphabetically.
    public String[] preProcess(String name)
        {
        name = name.replace(",", "");
        name = name.replace("-", "");
        String [] parts = name.split(" ");
        Arrays.sort(parts);
        return parts;
        }
    
    // Encode the name parts as soundex codes.
    public String encodeSoundex(String [] parts, String salt)
        {
        String code = "";
        for (String part: parts)
            {
            code += soundex(part);                   
            }
        return code+salt;
        }
    
    // Hashing of name or soundex-code.
    public String applyHashing(String code, int digits)
        {
        int hash = code.hashCode();
        // addded more trailing zeros in case the hash happens to be very short
        String hashStr = "0000000000000000"+hash;        
        return hashStr.substring(hashStr.length() - digits);        
        }
    
    // Encode a name into id.
    public String encode(String name, String salt, int digits)
        {
        String [] parts = preProcess(name);        Arrays.sort(parts);
        String code = encodeSoundex(parts,salt);
        return applyHashing(code,digits);
        }
    

    // Read names from text file.
    public List<String> getNames(String fn)
        {
        List<String> lines = new ArrayList();
        try
            {
            lines = Files.readAllLines(Paths.get(fn));
            }
        catch (Exception e)
            {
            e.printStackTrace();
            }
        return lines;
        }
    
    // Draw N random names from the namelist.
    List randomSelection(List L,int N)
        {
        Collections.shuffle(L);
        List t = new ArrayList(L.subList(0, N));        
        return t;
        }
    
    // Encode a name into id.
    public String encode2(String name, String salt, int digits)
        {
        String [] parts = preProcess(name);  
// first name, and inititals.        
//        parts = Arrays.copyOf(parts,1);
// last name
//        String tmp = parts[parts.length-1];
//        parts = Arrays.copyOf(parts,1);
//        parts[0] = tmp;
//System.out.println(Arrays.toString(parts)); 
// omit soundex
String code = "";
        for (String s: parts)
            {
            code += s;
            }
        code = code.replace(".", "");
        code = code.replace("-", "");
//System.out.println(code);
 //       String code = encodeSoundex(parts,salt);
        return applyHashing(code,digits);
        }
    
    List<String> encode2(List<String> list)
        {
        List<String> e = new ArrayList();
        for (String s: list)
            {
            String t = encode2(s,"",10);
            if (e.contains(t))
                {
                return null;
                }
            e.add(t);
            }
        return e;
        }
    
    public String reverse(String s)
        {
        StringBuilder reverseName = new StringBuilder();
        reverseName.append(s);
        reverseName.reverse();
        return ""+reverseName;        
        }
    public String shift(String s,int N)
        {
        String a = s.substring(0,N);
        String b = s.substring(N);
        return b + a;        
        }
    // L = modolus
    int coding(String name, int L, int type)
        {
        // common stuff
        int ID = -1;
        String revName = reverse(name);
        CRC32 crc = new CRC32(); 
        crc.reset();
             
        switch (type)
            {
            case 0: // default
                    ID = Math.abs((name.hashCode())%L);
                    break;
            case 1: // reverse
                    ID = Math.abs((revName.hashCode())%L);            
                    break;
            case 2: // CRC
                    crc.update(name.getBytes());
                    ID = Math.abs((int)crc.getValue()%L);                    
                    break;
            case 3: // CRC reverse
                    crc.update(revName.getBytes());
                    ID = Math.abs((int)crc.getValue()%L);                    
                    break;
            // shift in ten steps
            case 4: case  5: case  6: case  7: case  8: 
//            case 9: case 10: case 11: case 12: case 13: case 14:  // shift characters
                    // start at char 2 in zero indexed array
                    String nameC = shift(name, type - 3);
                    ID = Math.abs((nameC.hashCode())%L);                    
                    break;
            default: // salt based on the value as index into salt array
                    String salt = salts.get(type%salts.size());
                    String nameD = name + salt;
                    ID = Math.abs((nameD.hashCode())%L);                                  
                    break;                    
            }
        return ID;
        }
    public int findFreeCodingType(Map<Integer,List<Integer>> encodings, String name, int L, Map<Integer,List<Integer>> validations)
        {
        // first find number of possible coding types
        int noCodingTypes = 14 + salts.size();
        for (int type=0;type<noCodingTypes;type++)
            {
            int ID = coding(name,L,type);
            if (!encodings.containsKey(ID))
                {
                if (type == 0) // the default encoding
                    {
                    return type;
                    }
                // check if validation code is free also
                ID = coding(name,L,0);  // the default code as we have collision
                int validation = coding(name,L,type+validationOffset);
                if (validations.get(ID) == null || !validations.get(ID).contains(validation))
                    {
                    return type;
                    }
                }
            }
        return -1; // could not find a match
        }
    
   int validationOffset = 10; // arbitrary - and long away from the others
  
    public int findEncoding(Map<Integer,List<Integer>> encodings,Map<Integer,List<Integer>> validations,String name,int L)
        {
        // get the default (base) encoding
        int ID = coding(name,L,0);
        // lookup the coding type
        List<Integer> types = encodings.get(ID);
        List<Integer> validation = validations.get(ID);
        // find the one that is validtypes
        if (types == null)
            {
            return ID;
            }
        for (int i = 1;i < types.size();i++)
            {
            int type = types.get(i);
            int code = validation.get(i);
            int ID2 = coding(name,L,type);
            int valid = coding(name,L,type+validationOffset);
            // check that valid code is mathcing AND that it represent a valid value             
            if (valid == code && validations.get(ID2)!=null)
                {
                return ID2;
                } 
            }
        return ID;
        }   
   
    public void CodingAlternativesConfirmationHashSparse()
        {
        List<String> masterlist = getNames("names-longlist-unique.txt");
        
//         int iterations = 10000;    // no of simulations per case
         int iterations = 1;    // no of simulations per case
         int N = 10;           // variable        
         int L = 10000;        

    for (N = 10; N <= 100;N+=10)
        {
         // overall stats
         int correct = 0;
         int collision = 0;  
         int correctNameSets = 0;   // look at set as whole
         int withoutValidation = 0; 
         int withValidation = 0;
         int collisionsPerSet = 0;
         
         for (int i = 0; i < iterations; i++)
            {
            boolean error = false; // for stats
            boolean collided = false; // for stats
            List<String> selection = randomSelection(masterlist, N);

            Map<Integer,List<Integer>> encodings = new HashMap();
            Map<Integer,List<Integer>> validations = new HashMap();
         
            Map<Integer,String> facit = new HashMap();
            int randomIdx = 0;
            for (String name: selection)
                {
                // simple coding
                int type = findFreeCodingType(encodings,name,L,validations);
                int ID = coding(name,L,type); 
                List<Integer> list = new ArrayList();
                list.add(0); // default encoindg
                encodings.put(ID, list);
                // add validation as well
                List<Integer> list2 = new ArrayList();
                list2.add(-1); // default, keep info to a mimium
                validations.put(ID, list2);
             
                // store the ground truth for validation
                facit.put(ID,name);                          
                if (type != 0) // if it is not default
                    {
                    collided = true;
                    // need to store what the coding shouuld be
                    ID = coding(name,L,0); 
           
                    encodings.get(ID).add(type); // add element
                    validations.get(ID).add(coding(name,L,type+validationOffset)); // add element
                    collision++;                                  
                    }       
                }
            // decode
            for (String name: selection)
                {             
                int ID = findEncoding(encodings,validations,name,L);
                          
                if (facit.get(ID) != null && name.matches(facit.get(ID)))
                    {
                    correct++;
                    }
                else
                    {
                    error = true;    
                    }
                }        
            analyseKanonymity(masterlist,facit,encodings,validations,N,L);         
         
            if (!error) // for debugging
                {
                correctNameSets++;
                }
            if (collided) // for debugging
                {
                collisionsPerSet++;
                }
             }
         // output stats
//         System.out.println("N,"+N+",L,"+L+",iter.,"+iterations+",correct,"+correct+",coll.,"+collision+",corrSets,"+correctNameSets
//+",CollsPerSet,"+collisionsPerSet
//                 /*+",with/without-valitation"+withValidation+"/"+withoutValidation*/);
            
        }   // END N loop         
    }    
    
public void analyseKanonymity(List<String> masterlist,Map<Integer,String> facit,Map<Integer,List<Integer>> encodings,Map<Integer,List<Integer>> validations,int N,int L)
    {
    int [] histogram = new int[L];
    for (String name: masterlist)
        {
        // encode name
        int ID = findEncoding(encodings,validations,name,L);
        // store list
        histogram[ID]++;        
        }
    // find min, mean and max
    List<Integer> hist = Arrays.stream(histogram).boxed().collect(Collectors.toList());    
    double mean = hist.stream().mapToInt(val -> val).average().orElse(0.0);
    int min = Collections.min(hist);
    int max = Collections.max(hist);
    int unvisited = Collections.frequency(hist,0);
    // find the number of items to reject as ID does not exist
    int rejected = 0;
    for (int i = 0;i < histogram.length;i++)
        {
        if (!encodings.containsKey(i))
            {
            rejected += histogram[i];
            }
        }
    System.out.println("K-anonymity,N,"+N+",L,"+L+",min,"+min+",mean,"+mean+",max,"+max+",rejected,"+rejected+",unvisited,"+unvisited);
    }
    
    public static void main(String[] args)
        {
        // salts are read when the HIDE object is instanciated.        
        CANDIDATE me = new CANDIDATE();        
        me.salts = me.getNames("freqWords.txt");            

        me.CodingAlternativesConfirmationHashSparse();
        }
    }

